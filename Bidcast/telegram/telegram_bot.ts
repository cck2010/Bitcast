import dotenv from "dotenv";
import { Telegraf, Context } from "telegraf";
dotenv.config();

const TOKEN: string = process.env.TOKEN || "";
console.log(TOKEN);

const bot = new Telegraf(TOKEN);

bot.start((ctx: Context) => {
    console.log(ctx);

    ctx.reply("歡迎, 可以打 /help 睇下有咩function");
});

bot.help((ctx: Context) => {
    console.log(ctx);

    ctx.reply(`/start 開始\n/help 幫手`);
});

bot.hears(/^hi*/i, (ctx) => {
    console.log(ctx.message);

    let query = ctx.message.text.trim();
    query = query.split("").slice("hi".split("").length).join("");
    if (query == "") {
        ctx.reply("hi");
        return;
    }
    ctx.reply(query.trim());
});

bot.on("text", (ctx) => {
    // Explicit usage
    console.log(ctx.message);

    ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

    // Using context shortcut
    ctx.reply(`Hello ${ctx.state.role}`);
});

bot.on("sticker", (ctx) => {
    // Explicit usage
    console.log(ctx.message);

    ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

    // Using context shortcut
    ctx.reply(`Hello ${ctx.state.role}`);
});

bot.on("callback_query", (ctx) => {
    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

    // Using context shortcut
    ctx.answerCbQuery();
});

bot.on("inline_query", (ctx) => {
    const result: any[] = [];
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

    // Using context shortcut
    ctx.answerInlineQuery(result);
});

// bot.sendMessage("@cto56", "testing");

bot.catch((err) => {
    console.log(err);
});

bot.launch();
