const fs = require("fs");
const path = require("path");

/**
 * @param {import('./types').StrapUtils} util
 * @returns {import('./types').Strap}
 */
module.exports = (util) => ({
    name: "laravel-package",
    description: "Optional description",
    context: async () => {
        const title = await util.inquirer.input({ message: "Package name:" });
        const description = await util.inquirer.input({
            message: "Package description:",
            default: "Todo description",
        });
        const pascal = title.replaceAll(" ", "");
        const slug = title.toLowerCase().replaceAll(" ", "-");
        const initializeHost = await util.inquirer.confirm({
            message: "Initialize host project?",
        });
        const projectPath = initializeHost ? `./${slug}` : ".";
        return {
            title,
            pascal,
            slug,
            description,
            initializeHost,
            projectPath,
        };
    },
    tasks: [
        {
            title: "Initialize host project",
            skip: (ctx) => !ctx.initializeHost,
            task: (ctx) =>
                util.execa("composer", [
                    "create-project",
                    "laravel/laravel",
                    ctx.slug,
                ]),
        },
        {
            title: "Create packages folder",
            skip: (ctx) => util.fs.existsSync(`${ctx.projectPath}/packages`),
            task: (ctx) => {
                util.fs.mkdirSync(`${ctx.projectPath}/packages`, {
                    recursive: true,
                });
            },
        },
        {
            title: "Download skeleton",
            task: async (ctx) => {
                await util.execa(
                    "git",
                    [
                        "clone",
                        "https://github.com/mortenscheel/laravel-package-skeleton",
                        `${ctx.slug}`,
                    ],
                    {
                        cwd: `${ctx.projectPath}/packages`,
                    }
                );
                return await util.execa("rm", ["-rf", ".git"], {
                    cwd: `${ctx.projectPath}/packages/${ctx.slug}`,
                });
            },
        },
        {
            title: "Activate workflows",
            task: async (ctx) =>
                await util.execa("mv", [".github.disabled", ".github"], {
                    cwd: `${ctx.projectPath}/packages/${ctx.slug}`,
                }),
        },
        {
            title: "Replace placeholders",
            task: async (ctx, task) => {
                const replacer = (string) =>
                    string
                        .replace(/PackagePascal/g, ctx.pascal)
                        .replace(/:package_slug/g, ctx.slug)
                        .replace(/package_slug/g, ctx.slug)
                        .replace(/:package_name/g, ctx.title)
                        .replace(/:package_description/g, ctx.description);
                require("fs")
                    .readdirSync(`${ctx.projectPath}/packages/${ctx.slug}`, {
                        recursive: true,
                    })
                    .forEach((item) => {
                        const filePath = `${ctx.projectPath}/packages/${ctx.slug}/${item}`;
                        if (fs.statSync(filePath).isFile()) {
                            const content = fs.readFileSync(filePath, "utf-8");
                            const replaced = replacer(content);
                            if (content !== replaced) {
                                fs.writeFileSync(filePath, replaced, "utf-8");
                            }
                            const renamedPath = replacer(filePath);
                            if (filePath !== renamedPath) {
                                fs.renameSync(filePath, renamedPath);
                            }
                        }
                    });
            },
        },
        {
            title: "Install package",
            task: async (ctx) => {
                await util.execa(
                    "composer",
                    ["config", "minimum-stability", "dev"],
                    { cwd: ctx.projectPath }
                );
                const repo = JSON.stringify({
                    type: "path",
                    url: `./packages/${ctx.slug}`,
                });
                await util.execa(
                    "composer",
                    ["config", `repositories.mortenscheel/${ctx.slug}`, repo],
                    {
                        cwd: ctx.projectPath,
                    }
                );
                return await util.execa(
                    "composer",
                    ["require", `mortenscheel/${ctx.slug}`],
                    { cwd: ctx.projectPath }
                );
            },
        },
    ],
});
