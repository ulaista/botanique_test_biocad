const devices = [
    {
        id: 1,
        name: "pH-метр Mettler-Toledo International, Inc. SevenCompact S220",
        image: "/static/device1.png",
        status: "Свободен",
        bellStatus: "enabled"
    },
    {
        id: 2,
        name: "Спектрофотометр Varian, Inc Cary 50 Bio",
        image: "/static/device2.png",
        status: "Свободен",
        bellStatus: "enabled"
    },
    {
        id: 3,
        name: "Титратор",
        image: "/static/device3.png",
        status: "Занят",
        bellStatus: "dontdisturb"
    },
    {
        id: 4,
        name: "Коагулометр Tcoag, KC 4 Delta",
        image: "/static/device4.png",
        status: "Занят",
        bellStatus: "disabled"
    }
];

const workLogs = [
    {
        id: 1,
        startTime: "2024-01-01T12:17:00",
        workType: "Измерение",
        status: "В работе",
        sampleInfo: "Образец/серия: 000100057935_170000010325_0000251849",
        result: {
            comment: "Промывка с указанием вещества: Вещество\nКомментарий: тест успешности",
            status: "completed"
        },
        user: "morozovava"
    },
    {
        id: 2,
        startTime: "2017-17-17T12:17:00",
        workType: "Калибровка",
        status: "В работе",
        sampleInfo: "Номер колонки: Колонка 2<br>Образец: Образец 2<br>Образец: образец 1<br>Метод: метов тестовый<br>Номер колонки: Колонка 1",
        result: {
            comment: "",
            status: "completed"
        },
        user: "morozovava"
    },
    {
        id: 3,
        startTime: "2024-11-07T12:17:00",
        workType: "Очистка",
        status: "Завершено",
        sampleInfo: "Очистка прибора перед калибровкой",
        result: {
            comment: "Прибор успешно очищен",
            status: "completed"
        },
        user: "ivanovava"
    },
    {
        id: 4,
        startTime: "2024-07-22T12:17:00",
        workType: "Проверка",
        status: "В работе",
        sampleInfo: "Проверка работоспособности датчика",
        result: {
            comment: "",
            status: "in_progress"
        },
        user: "petrovnava"
    },
    {
        id: 5,
        startTime: "2023-11-22T12:17:00",
        workType: "Измерение",
        status: "Завершено",
        sampleInfo: "Измерение pH уровня воды",
        result: {
            comment: "Результаты в пределах нормы",
            status: "completed"
        },
        user: "ivanovava"
    },
    {
        id: 6,
        startTime: "2024-05-22T12:17:00",
        workType: "Калибровка",
        status: "Завершено",
        sampleInfo: "Калибровка сенсора pH",
        result: {
            comment: "Калибровка успешно завершена",
            status: "completed"
        },
        user: "ivanovava"
    },
    {
        id: 7,
        startTime: "2024-08-22T12:17:00",
        workType: "Измерение",
        status: "В работе",
        sampleInfo: "Измерение концентрации химического вещества",
        result: {
            comment: "",
            status: "in_progress"
        },
        user: "morozovava"
    },
    {
        id: 8,
        startTime: "2024-09-22T12:17:00",
        workType: "Очистка",
        status: "Завершено",
        sampleInfo: "Очистка прибора после использования",
        result: {
            comment: "Прибор очищен. Без замечаний.",
            status: "completed"
        },
        user: "ivanovava"
    },
    {
        id: 9,
        startTime: "2024-10-22T12:17:00",
        workType: "Измерение",
        status: "В работе",
        sampleInfo: "Измерение уровня загрязнения воздуха",
        result: {
            comment: "",
            status: "in_progress"
        },
        user: "petrovnana"
    },
    {
        id: 10,
        startTime: "2024-11-18T12:17:00",
        workType: "Калибровка",
        status: "Завершено",
        sampleInfo: "Калибровка давления",
        result: {
            comment: "Калибровка завершена успешно",
            status: "completed"
        },
        user: "ivanovava"
    },
    {
        id: 11,
        startTime: "2024-11-19T12:17:00",
        workType: "Измерение",
        status: "Завершено",
        sampleInfo: "Измерение температуры образца",
        result: {
            comment: "Температура в норме",
            status: "completed"
        },
        user: "ivanovava"
    },
    {
        id: 12,
        startTime: "2024-11-20T12:17:00",
        workType: "Очистка",
        status: "В работе",
        sampleInfo: "Очистка прибора перед следующей сессией",
        result: {
            comment: "",
            status: "in_progress"
        },
        user: "petrovnana"
    },
    {
        id: 1,
        startTime: "2024-11-21T12:17:00",
        workType: "Измерение",
        status: "В работе",
        sampleInfo: "Образец/серия: 000100057935_170000010325_0000251849",
        result: {
            comment: "Промывка с указанием вещества: Вещество\nКомментарий: тест успешности",
            status: "completed"
        },
        user: "morozovava"
    },
    {
        id: 2,
        startTime: "2024-11-22T12:17:00",
        workType: "Калибровка",
        status: "В работе",
        sampleInfo: "Номер колонки: Колонка 2<br>Образец: Образец 2<br>Образец: образец 1<br>Метод: метов тестовый<br>Номер колонки: Колонка 1",
        result: {
            comment: "",
            status: "completed"
        },
        user: "morozovava"
    },
];

function handleApiRoutes(req, res) {
    if (req.url === '/api/devices' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(devices));
    } else if (req.url === '/api/worklogs' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(workLogs));
    } else {
        return false;
    }
    return true;
}

module.exports = handleApiRoutes;
