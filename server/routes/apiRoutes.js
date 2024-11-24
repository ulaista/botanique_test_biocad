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
        startTime: "09.10.2021, 15:46",
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
        startTime: "12.10.2021, 12:17",
        workType: "Калибровка",
        status: "В работе",
        sampleInfo: "Номер колонки: Колонка 2<br>Образец: Образец 2<br>Образец: образец 1<br>Метод: метов тестовый<br>Номер колонки: Колонка 1",
        result: {
            comment: "",
            status: "completed"
        },
        user: "morozovava"
    }
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
