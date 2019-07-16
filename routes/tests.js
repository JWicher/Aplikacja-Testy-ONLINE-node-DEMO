const { Test, validate } = require('../models/test');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const tests = await Test.find()
                        .or( [
                            {'ktoWidziTest._id': req.użytkownik._id },
                            {'ktoWidziTest._id': req.użytkownik.firma._id },
                            {'ktoWidziTest._id': "" }
                        ] );
    // setTimeout( ()=>{
        res.status(200).send(tests);
    // }, 3000)
});

router.post('/', async (req, res) => {
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send("Złe dane wejściowe. Nie można zarejestrować testu.");
    let test = new Test(req.body);
    test = await test.save();
    res.status(200).send(test);
});

router.patch('/:id', async (req, res) => {
    let test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!test) return res.status(404).send('Nie znaleziono testu w bazie danych.');
    res.status(200).send( test );
});

router.delete('/:id', async (req, res) => {
    let test = await Test.findByIdAndRemove(req.params.id);
    if(!test) return res.status(404).send('Nie znaleziono testu w bazie danych.');
    res.status(200).send(test);
})

module.exports = router;



async function insertTest(){
    const test = {
        nazwa: "Placement Test - English B1-C2",
        zarejestrowal: { nazwa: 'Andrzej Nowak', _id: "5d06263ac2563310e9ba8847", data: "2019-06-12" },
        modyfikowal: { nazwa: 'Błażej Kowalski', _id: "5d06263ac2563310e9ba8847", data: "2019-06-15" },
        publiczny: false,
        ktoWidziTest: {id: "", nazwa: ""},
        avatar: "gb.jpeg",
        krotkiOpis: "Test z języka angielskiego",
        limitCzasowy: { czyLimit: true, minuty: 25, sekundy: 00 },
        instrukcja: 
            'For the questions below, please choose the best option to complete the sentence or conversation. Only one answer is correct.\n- Time: 25 minutes.\n- First part include 25 closed questions.\n- Choose the best answer to each from option: a, b, c or d. You can choose only one.\n- Second part: open question - write an email. Task is on the last page of the test.\n- When you will decide to end the test, push button "Send answers" located at the bottom of the test.\n- You can check remaining time. Clock is near the "Send answers" button.'
        ,
        zadania: [
            {
                numer: 1,
                typ: "zamknięte",
                tresc: "When can we meet again?",
                opcje_wyboru: [
                    { id: "A", tresc: "When are you free??" },
                    { id: "B", tresc: "It was two days ago." },
                    { id: "C", tresc: "Can you help me?" },
                    { id: "D", tresc: "Can you help me?" },
                ],
                poprawna_odpowiedz: "A"
            },
            {
                numer: 2,
                typ: "zamknięte",
                tresc: "My aunt is going to stay with me.",
                opcje_wyboru: [
                    { id: "A", tresc: "How do you do?" },
                    { id: "B", tresc: "How long for?" },
                    { id: "C", tresc: "How was it?" },
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 3,
                typ: "zamknięte",
                tresc: "When do you study?",
                opcje_wyboru: [
                    { id: "A", tresc: "at school" },
                    { id: "B", tresc: "in the evenings" },
                    { id: "C", tresc: "in the library" },
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 4,
                typ: "zamknięte",
                tresc: "Would you prefer lemonade or orange juice?",
                opcje_wyboru: [
                    { id: "A:", tresc: "Have you got anything else?" },
                    { id: "B:", tresc: "If you like." },
                    { id: "C:", tresc: "Are you sure about that?" }
                ],
                poprawna_odpowiedz: "A"
            },
            {
                numer: 5,
                typ: "zamknięte",
                tresc: "Let's have dinner now.",
                opcje_wyboru: [
                    { id: "A", tresc: "You aren't eating." },
                    { id: "B", tresc: "There aren't any." },
                    { id: "C", tresc: "Tom isn't here yet." }
                ],
                poprawna_odpowiedz: "C"
            },
            {
                numer: 6,
                typ: "zamknięte",
                tresc: "The snow was ...... heavily when I left the house.",
                opcje_wyboru: [
                    { id: "A", tresc: "dropping" },
                    { id: "B", tresc: "landing" },
                    { id: "C", tresc: "falling" },
                    { id: "D", tresc: "descending" }
                ],
                poprawna_odpowiedz: "C"
            },
            {
                numer: 7,
                typ: "zamknięte",
                tresc: "I can't find my keys anywhere - I ...... have left them at work.",
                opcje_wyboru: [
                   { id: "A", tresc: "can" },
                   { id: "B", tresc: "must" },
                   { id: "C", tresc: "ought" },
                   { id: "D", tresc: "would" }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 8,
                typ: "zamknięte",
                tresc: "When a car pulled out in front of her, Jane did well not to ...... control of her bicycle.",
                opcje_wyboru: [
                   { id: "A", tresc: "miss" },
                   { id: "B", tresc: "lose" },
                   { id: "C", tresc: "fail" },
                   { id: "D", tresc: "drop" }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 9,
                typ: "zamknięte",
                tresc: "According to Richard's ...... the train leaves at 7 o'clock.",
                opcje_wyboru: [
                   { id: "A", tresc: "opinion" },
                   { id: "B", tresc: "advice" },
                   { id: "C", tresc: "knowledge" },
                   { id: "D", tresc: "information" }
                ],
                poprawna_odpowiedz: "D"
            },
            {
                numer: 10,
                typ: "zamknięte",
                tresc: "When you stay in a country for some time you get used to the people's ...... of life.",
                opcje_wyboru: [
                   { id: "A", tresc: "habit" },
                   { id: "B", tresc: "custom" },
                   { id: "C", tresc: "way" },
                   { id: "D", tresc: "system" }
                ],
                poprawna_odpowiedz: "C"
            },
            {
                numer: 11,
                typ: "zamknięte",
                tresc: "The builders are ...... good progress with the new house.",
                opcje_wyboru: [
                   { id: "A", tresc: "getting" },
                   { id: "B", tresc: "doing" },
                   { id: "C", tresc: "making" },
                   { id: "D", tresc: "taking" }
                ],
                poprawna_odpowiedz: "C"
            },
            {
                numer: 12,
                typ: "zamknięte",
                tresc: "She is now taking a more positive ...... to her studies and should do well.",
                opcje_wyboru: [
                   { id: "A", tresc: "attitude" },
                   { id: "B", tresc: "behaviour" },
                   { id: "C", tresc: "manner" },
                   { id: "D", tresc: "style" }
                ],
                poprawna_odpowiedz: "A"
            },
            {
                numer: 13,
                typ: "zamknięte",
                tresc: "My father ...... his new car for two weeks now.",
                opcje_wyboru: [
                   { id: "A", tresc: "has had" },
                   { id: "B", tresc: "has" },
                   { id: "C", tresc: "is having" },
                   { id: "D", tresc: "had" }
                ],
                poprawna_odpowiedz: "A"
            },
            {
                numer: 14,
                typ: "zamknięte",
                tresc: "What differences are there ...... the English spoken in the UK and the English spoken in the US?",
                opcje_wyboru: [
                   { id: "A", tresc: "among" },
                   { id: "B", tresc: "between" },
                   { id: "C", tresc: "beside" },
                   { id: "D", tresc: "with" }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 15,
                typ: "zamknięte",
                tresc: "At 6 p.m. I started to get angry with him because he was late ......",
                opcje_wyboru: [
                   { id: "A", tresc: "as usual." },
                   { id: "C", tresc: "typically." },
                   { id: "B", tresc: "in general." },
                   { id: "D", tresc: "usually." }
                ],
                poprawna_odpowiedz: "A"
            },
            {
                numer: 16,
                typ: "zamknięte",
                tresc: "...... you get your father's permission, I'll take you skiing next weekend.",
                opcje_wyboru: [
                   { id: "A", tresc: "Although" },
                   { id: "B", tresc: "Provided" },
                   { id: "C", tresc: "As" },
                   { id: "D", tresc: "Unless" }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 17,
                typ: "zamknięte",
                tresc: "A local company has agreed to ...... the school team with football shirts.",
                opcje_wyboru: [
                   { id: "A", tresc: "contribute" },
                   { id: "B", tresc: "supply" },
                   { id: "C", tresc: "give" },
                   { id: "D", tresc: "produce" }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 18,
                typ: "zamknięte",
                tresc: "I really enjoy stories that are ...... in the distant future.",
                opcje_wyboru: [
                   { id: "A", tresc: "found" },
                   { id: "B", tresc: "set" },
                   { id: "C", tresc: "put" },
                   { id: "D", tresc: "placed" }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 19,
                typ: "zamknięte",
                tresc: "That old saucepan will come in ...... when we go camping.",
                opcje_wyboru: [
                   { id: "A", tresc: "convenient" },
                   { id: "B", tresc: "fitting" },
                   { id: "C", tresc: "handy" },
                   { id: "D", tresc: "suitable" }
                ],
                poprawna_odpowiedz: "C"
            },
            {
                numer: 20,
                typ: "zamknięte",
                tresc: "Anyone ...... after the start of the play is not allowed in until the interval.",
                opcje_wyboru: [
                   { id: "A", tresc: "arrives" },
                   { id: "B", tresc: "has arrived" },
                   { id: "C", tresc: "arriving" },
                   { id: "D", tresc: "arrived" }
                ],
                poprawna_odpowiedz: "C"
            },
            {
                numer: 21,
                typ: "zamknięte",
                tresc: "I didn't ...... driving home in the storm so I stayed overnight in a hotel.",
                opcje_wyboru: [
                   { id: "A", tresc: "fancy" },
                   { id: "B", tresc: "desire" },
                   { id: "C", tresc: "prefer" },
                   { id: "D", tresc: "want" }
                ],
                poprawna_odpowiedz: "A"
            },
            {
                numer: 22,
                typ: "zamknięte",
                tresc: "The judge said that those prepared to...... in crime must be ready to suffer the consequences.",
                opcje_wyboru: [
                   { id: "A", tresc: "involve" },
                   { id: "B", tresc: "engage" },
                   { id: "C", tresc: "undertake" },
                   { id: "D", tresc: "enlist" }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 23,
                typ: "zamknięte",
                tresc: "Marianne seemed to take ...... at my comments on her work.",
                opcje_wyboru: [
                   { id: "A", tresc: "annoyance" },
                   { id: "B", tresc: "insult" },
                   { id: "C", tresc: "offence" },
                   { id: "D", tresc: "indignation" }
                ],
                poprawna_odpowiedz: "C"
            },
            {
                numer: 24,
                typ: "zamknięte",
                tresc: "You should not have a dog if you are not ...... to look after it.",
                opcje_wyboru: [
                   { id: "A", tresc: "prepared" },
                   { id: "B", tresc: "adapted" },
                   { id: "C", tresc: "arranged" },
                   { id: "D", tresc: "decided" }
                ],
                poprawna_odpowiedz: "A"
            },
            {
                numer: 25,
                typ: "zamknięte",
                tresc: "The farmhouse was so isolated that they had to generate their own electricity ......",
                opcje_wyboru: [
                   { id: "A", tresc: "current." },
                   { id: "B", tresc: "supply." },
                   { id: "C", tresc: "grid." },
                   { id: "D", tresc: "power." }
                ],
                poprawna_odpowiedz: "B"
            },
            {
                numer: 26,
                typ: "otwarte",
                // tytul: "Placement test / Writing", // do wycofania
                tresc:`In this task you need to write a formal email, minimum of 120 words. You could invent any necessary details to make authentic impression.
                    Imagine that you work for an international company. You have received an mail from the customer. The client complains that the technician did not reach his company yesterday and the payment terminals still do not work. The customer is frustrated.
                    Your task is to answer this email, where you explain the situation and the reason for the absence of the technician.
                    Start with salutation or greetings,
                    Good Luck!`
            },
        ]
    }
    
    const test1 = new Test(test)
    await test1.save()

    // await Test.deleteMany()
    // const l = await Test.find();
    // l.forEach( l => console.log(l.zadania[0].opcje_wyboru))
    // console.log(l)
}
// insertTest()