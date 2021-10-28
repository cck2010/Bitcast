import axios from "axios";
import dotenv from "dotenv";
import { Telegraf, Context,Markup} from "telegraf";
dotenv.config();

const TOKEN: string = process.env.TOKEN || "";
// console.log(TOKEN);

const bot = new Telegraf(TOKEN);
// const botComposer = new Composer()

bot.start((ctx: Context) => {
    ctx.reply('你好，我係bidcast bot，請問有咩幫到你？\n 認証帳戶，請按：verify\n function2，請按：func2\n function3，請按：func3', Markup
    .keyboard(['/Verify','/function2',"/function3"])
    .oneTime()
    .resize()
  )
});




bot.help((ctx: Context) => {
    // console.log(ctx);
    console.log("有人叫/help")
    

    ctx.reply(`/start 開始\n/help 幫手\n`);
});

// bot.command('bidcast', (ctx) =>
//   ctx.reply('你好，我係bidcast bot，請問有咩幫到你？\n 認証帳戶，請按：verify\n function2，請按：func2\n function3，請按：func3', Markup
//     .keyboard(['/Verify','/function2',"/function3"])
//     .oneTime()
//     .resize()
//   )
// )

// bot.command('verify', ctx.reply('Hey', Extra.markup(Markup.forceReply())))
// botComposer.settings(async (ctx:any) => {
//     await  ctx.setMyCommands([
//       {
//         command: '/Verify',
//         description: '認証Bidcast登記Telegram帳戶',
//       },
//       {
//         command: '/How',
//         description: 'How to verify',
//       },
//     ])
//     return ctx.reply('Ok')
//   })

bot.settings(async (ctx) => {
    await ctx.setMyCommands([
      {
        command: '/verify',
        description: '認証你於Bidcast上登記的 Telegram 帳戶'
      },
      {
        command: '/how',
        description: '查詢認証流程'
      },
    ])
    return ctx.reply('Ok')
  })
  

bot.command('verify',(ctx) => {
    ctx.reply("請輸入電郵地址以確認 Telegram 帳戶", Markup.forceReply());
});
bot.command('how',(ctx) => {
    ctx.reply("認証Bidcast的Telegram帳戶流程：\n\n  Step 1: 註冊成為bidcast會員\n  Step 2: 在手機telegram設置中，加入username\n  Step 3: 到更改帳戶資料頁面填上你的Telegram username(eg. @bidcast)\n  Step 4: 打開左下方Menu，選擇/verify\n  Step 5: 輸入你的bidcast電郵地址\n  Step 6: 看到成功確認信息後，回bidcast網頁的帳戶資料頁面，Telegram帳戶欄會變成「已確認」狀態");
});

bot.hears(/@?com/i,async (ctx)=>{
    console.log("email detected")
    // ctx.reply("email detected")

    let tgUserId = ctx.message.from.id;
    let query = ctx.message.text.trim();
        
        // checking?
        let email = query.trim()
        console.log("email", email);
        ctx.reply(`接收電郵地址為：${email}`);
    
        let tgGetUsername = ctx.message.from.username? `@${ctx.message.from.username}`:"";
        // let tgUserId = ctx.message.from.id;
        console.log("tgUserId>>>>>>>>>>>", tgUserId);
        console.log("tgUsername>>>>>>>>>>>", tgGetUsername);
        
        const result = await checkVerified(tgGetUsername,email)
        ctx.reply(result);

    // }
})




async function checkVerified(tgGetUsername:string,email:string){
    try {
        const res = await axios(`${process.env.REACT_APP_BACKEND_URL}/bidcast-bot/checkVerified`,{
            method: "POST",
            headers:({'Content-Type': 'application/json'}),
            data: {tgGetUsername:`${tgGetUsername}`,tgGetEmail:`${email}`}
        })
        
        // console.log("res", res);
        const result:any = await res.data;
        const msg = result.data.msg
        return msg
        // console.log("result", result.data.msg);
        
    } catch (error) {
        console.log(error)
    }
    
}




bot.on("text", (ctx) => {
    ctx.telegram.sendMessage(ctx.message.chat.id, `請打開左下角Menu 選擇項目`);

    // Explicit usage
    // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);
    // Using context shortcut
    // ctx.reply(`Hello ${ctx.state.role}`);
});




bot.on("sticker", (ctx) => {

    ctx.telegram.sendMessage(ctx.message.chat.id, `請打開左下角Menu 選擇項目`);
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




//*** Sample field ***
//*** Sample field ***
//*** Sample field ***

//! Send phone number or location
// bot.command('function2', (ctx) => {
//     return ctx.reply(
//       'Special buttons keyboard',
//       Markup.keyboard([
//         Markup.button.contactRequest('Send contact'),
//         Markup.button.locationRequest('Send location')
//       ]).resize()
//     )
//   })

//! quiz
// bot.command('quiz', (ctx) =>
//   ctx.replyWithQuiz(
//     '2b|!2b',
//     ['True', 'False'],
//     { correct_option_id: 0 }
//   )
// )
//! Poll
// bot.command('poll', (ctx) =>
//   ctx.replyWithPoll(
//     'Your favorite math constant',
//     ['x', 'e', 'π', 'φ', 'γ'],
//     { is_anonymous: false }
//   )
// )
//! create Poll or Quiz
// const keyboard = Markup.keyboard([
//     Markup.button.pollRequest('Create poll', 'regular'),
//     Markup.button.pollRequest('Create quiz', 'quiz')
//   ])
// bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', keyboard))




  

//*** Sample field ***
//*** Sample field ***
//*** Sample field ***