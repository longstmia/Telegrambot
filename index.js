const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
//Инициализируем переменные из .env
require('dotenv').config();


//Инициализируем бота
const bot = new TelegramBot('6637193626:AAEuRVdvjcrZIaqoHBpmMo7rbcobSsp0mmw',{

    polling: true

});

//Массив с объектами для меню команд
const commands = [
    {command: "start", description: "Запуск бота"},
]

//Устанавливаем меню команд
bot.setMyCommands(commands);

//Слушатель для текстового сообщения
bot.on('text', async msg => {
    try {
        //Обрабатываем запуск бота
        if (msg.text.startsWith('/start')) {
            // Приветственное сообщение
            await bot.sendPhoto(msg.chat.id, fs.readFileSync('img/banner.jpg'), {
                caption: `Добро пожаловать в бота👋\n` +
                    '🔗 Список команд:',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '📖 Библиотека курсов', callback_data: 'buyFileber' }],
                        [{ text: '🚀 Доступ ко всем категориям', url: 'https://t.me/longstm1a' }],
                        [{ text: '💬 Поддержка', url: 'https://t.me/longstm1a' }],
                    ]
                },
            });

            // Отправляем рекламное сообщение раз в минуту
            setInterval(async (msg) => {
                const advertisements = [
                    '[Привет! У меня есть отличное предложение для тебя.\n'  +
                    ' 🎉 Если ты оформишь Альфа-Карту или Альфа-Стикер в Альфа-Банке по моей ссылке, ' +
                    'ты получишь 500 ₽ бонусом и бесплатный доступ ко "ВСЕМ КАТЕГОРИЯМ КУРСОВ".\n' +
                    '😊 Это отличный старт, ведь карта абсолютно бесплатная и предлагает суперкэшбэк до 100% каждый месяц.\n' +
                    '💰 К тому же, ты можешь выбрать четыре категории, в которых получишь дополнительные 5% кэшбэка. 📚' +
                    'Если вы оформимли, напишите в поддержку и вам датут доступ.](https://alfa.me/Em7PJ8)',

                    '[Конечно, я подписываюсь на ваш канал с бесплатными курсами!\n' +
                    '📚🔥 Несмотря на то, что там может не быть бешенных курсов от топовых школ, я уверен, что найду много интересного и полезного материала.\n' +
                    '🌟🎓 Учиться всегда стоит, вне зависимости от источника знаний. ' +
                    '📖💡 Я уверен, что ваш канал предложит мне новые и захватывающие возможности для обучения и развития. 💪\n' +
                    '\n' +
                    'С нетерпением жду, чтобы узнать больше о ваших бесплатных курсах и начать погружаться в мир новых знаний и навыков!\n' +
                    '🚀🌍 Спасибо за предоставленную возможность! 😊✨](https://t.me/+Ov54eKKK9Ng5OGQy) ![Бесплатные курсы](img/banner.jpg)',
                    // Добавьте свои рекламные сообщения в список
                ];
                const randomIndex = Math.floor(Math.random() * advertisements.length);
                const advertisement = advertisements[randomIndex];
                await bot.sendMessage(msg.chat.id, advertisement, { parse_mode: 'Markdown' });
            }, 60 * 1000, msg);
        } else {
            //Отправляем пользователю сообщение
            const msgWait = await bot.sendMessage(msg.chat.id, `Я на смогу ответить на этот вопрос, обратитесь в нашу поддержку`);
        }

    } catch (error) {
        console.log(error);
    }

})

// Обрабатываем коллбеки на инлайн-клавиатуре
bot.on('callback_query', async ctx => {
    try {
        switch (ctx.data) {
            case 'buyFileber':
                await bot.sendPhoto(ctx.message.chat.id, fs.readFileSync('img/category.png' ), {
                    caption: '🔗 Список категорий:',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Брови', callback_data: 'brows' }],
                            [{ text: 'IT', callback_data: 'it' }],
                            [{ text: '☰ Меню', callback_data: 'menu' }]
                            // Добавьте свои кнопки здесь
                        ]
                    }
                });
                break;
            // case 'fullAccess':
            //     await bot.sendPhoto(ctx.message.chat.id, fs.readFileSync('img/banner.jpg'), {
            //         caption: 'После оплаты, вам будет предоставлена персональная ссылка на канал 😊\n' +
            //             '\n' +
            //             'Там вы найдете все курсы, которые постоянно пополняются 😎\n' +
            //             '\n' +
            //             'Если вы потеряли ссылку или оплатили, но бот ничего вам не отправил, просто обратитесь в поддержку 🙌',
            //         reply_markup: {
            //             inline_keyboard: [
            //                 [{ text: 'КУПИТЬ - 700р', url: 'https://t.me/longstm1a' }],
            //                 [{ text: '☰ Меню', callback_data: 'menu' }]
            //                 // Добавьте свои кнопки здесь
            //             ]
            //         }
            //     });
            //
            //
            //     break;
            case 'brows':
                await bot.sendPhoto(ctx.message.chat.id, fs.readFileSync('img/version.png'), {
                    caption: 'Так же можно выкупить 1 курс - просто выбирете курс и напишиет в поддержку:',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '📚 Перейти к просмотру курсов', url: 'https://t.me/+-yAxLFYZpQo2N2Ri' }],
                            [{ text: '💰 Купить категорию - 400р', url: 'https://t.me/longstm1a' }],
                            [{ text: '☰ Меню', callback_data: 'menu' }]
                            // Добавьте свои кнопки здесь
                        ]
                    }
                });


                break;

            // тоже что и start
            case 'menu':
                await bot.sendPhoto(ctx.message.chat.id, fs.readFileSync('img/banner.jpg'), {
                    caption: `Добро пожаловать в бота👋\n` +
                    '🔗 Список команд:',

                reply_markup: {
                    // Добавляем инлайн-клавиатуру
                    inline_keyboard: [
                        [{ text: '📖 Библиотека курсов', callback_data: 'buyFileber' }],
                        [{ text: '🚀 Доступ ко всем категориям', url: 'https://t.me/longstm1a' }],
                        [{ text: '💬 Поддержка', url: 'https://t.me/longstm1a' }],
                    ]
                },
            });
                break;

            case 'it':
                await bot.sendPhoto(ctx.message.chat.id, fs.readFileSync('img/version.png'), {
                    caption: 'Так же можно выкупить 1 курс - просто выбирете курс и напишиет в поддержку:',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '📚 Перейти к просмотру курсов', url: 'https://t.me/+8AW3m4xZxU8wMDE6' }],
                            [{ text: '💰 Купить категорию - 400р', url: 'https://t.me/longstm1a' }],
                            [{ text: '☰ Меню', callback_data: 'menu' }]
                            // Добавьте свои кнопки здесь
                        ]
                    }
                });
                break;
        }
        }

    catch (error) {
        console.log(error);
    }
});



// bot.on('callback_query', async ctx => {
//     try {
//         switch(ctx.data) {
//             case "buyFile":
//                 await bot.sendInvoice(
//                     ctx.message.chat.id,
//                     'Категория "Брови"',
//                     'Покупка категории "Брови"',
//                     'file',
//                     '1832575495:TEST:cb3f2f23dd0fd73d4d0246ea0adeee7b4102f3ee186ea140412a276dd62f8c77', // Replace with your token
//                     'RUB',
//                     [
//                         {
//                             label: 'Файл',
//                             amount: 40000
//                         }
//                     ],
//
//                 );
//                 break;
//             case "buyFull":
//                 await bot.sendInvoice(
//                     ctx.message.chat.id,
//                     'Купить Продукт',
//                     'Покупка продукта',
//                     'product',
//                     '1832575495:TEST:cb3f2f23dd0fd73d4d0246ea0adeee7b4102f3ee186ea140412a276dd62f8c77', // Replace with your token
//                     'RUB',
//                     [
//                         {
//                             label: 'Продукт',
//                             amount: 70000
//                         }
//                     ]
//                 );
//                 break;
//         }
//     }
//     catch(error) {
//         console.log(error);
//     }
// })
// //Окончательно подтверждаем формирование заказа по счету при оплате
// bot.on('pre_checkout_query', async ctx => {
//
//     try {
//
//         await bot.answerPreCheckoutQuery(ctx.id, true);
//
//     }
//     catch(error) {
//
//         console.log(error);
//
//     }
//
// })
// //Обрабатываем удачный платеж от пользователя
// bot.on('successful_payment', async ctx => {
//     try {
//         const chatId = ctx.chat.id;
//         const amount = ctx.successful_payment.total_amount;
//
//         if (amount === 40000) {
//             // Если сумма оплаты равна 40000, отправляем одно сообщение
//             await bot.sendMessage(chatId, 'Спасибо за оплату 400 рублей! Присоединяйтесь к нашей группе: [Группа](https://t.me/+AKXRoQdHTzBlMjEy)');
//         } else if (amount === 70000) {
//             // Если сумма оплаты равна 50000, отправляем другое сообщение
//             await bot.sendMessage(chatId, 'Спасибо за оплату 700 рублей! Присоединяйтесь к нашей группе: [Группа](https://t.me/+AKXRoQdHTzBlMjEy)');
//         } else {
//             // Добавьте обработку других сумм оплаты, если необходимо
//             await bot.sendMessage(chatId, 'Спасибо за оплату! Присоединяйтесь к нашей группе: [Группа](https://t.me/+AKXRoQdHTzBlMjEy)');
//         }
//
//         setTimeout(async () => {
//             // Отправляем рекламное сообщение через 2 минуты
//             await bot.sendMessage(chatId, 'Рекламное сообщение');
//         }, 60 * 1000); // 2 минуты = 2 * 60 * 1000 миллисекунд
//     } catch (error) {
//         console.log(error);
//     }
// });



//Ловим ошибки polling'a
bot.on("polling_error", err => console.log(err.data.message));

