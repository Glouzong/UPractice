/*global require*/
const express = require('express');
const bodyParser = require('body-parser');
//const mongoClient = require('mongodb').MongoClient;
const dataBase = require('diskdb');

const app = express();
dataBase.connect('public/db', ['articles']);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public/ui'));

app.get('/getArticles', function (req, res) {
    const begin = Number(req.query.begin);
    const end = Number(req.query.end);
    const result = newsModel.getArticles(begin, end);
    res.json(result);
});
app.get('/getArticle', function (req, res) {
    const id = req.query.id;
    const result = newsModel.getArticle(id);
    res.json(result);
});
app.get('/getLength', function (req, res) {
    res.json(newsModel.getLength());
});
app.get('/getId', function (req, res) {
    res.json(newsModel.getId());
});
app.delete('/removeArticle', function (req, res) {
    const newsId = req.query.newsId;
    res.json(newsModel.removeArticle(newsId));
});
app.post('/addArticle', function (req, res) {
    const result = newsModel.addArticle(req.body);
    res.json(result);
});

app.get('/veracityLogin', function (req, res) {
    res.json(veracityLogin(req.query.login, req.query.password));
});

const nicknames = [
    {
        nickname: 'Вася',
        password: '12345678'
    },
    {
        nickname: 'Петя',
        password: '12345678'
    },
    {
        nickname: 'Кто-то',
        password: '12345678'
    }
];

function veracityLogin(login, password) {
    for (let i = 0; i < nicknames.length; ++i) {
        if (nicknames[i].nickname == login && nicknames[i].password == password) {
            return 1;
        }
    }
    return 0;
}

const newsModel = (function () {
    let articles = [
        {
            id: '1',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2017-02-27T23:00:00'),
            author: 'Иванов Иван',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.'
        },
        {
            id: '2',
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2017-01-27T24:00:00'),
            author: 'Kto-to',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat in ipsum ut facilisis. Aliquam varius augue eget odio vehicula,' +
            ' vel viverra magna eleifend. In pharetra, ligula vitae fringilla molestie, justo turpis euismod massa, non malesuada eros ligula vel nisl. Maecenas' +
            ' in nibh egestas, rhoncus metus et, eleifend lorem. In neque metus, tempor id ultrices vestibulum, pulvinar quis nulla. Morbi convallis imperdiet imperdiet.' +
            ' Curabitur consequat mattis odio rutrum auctor. Nullam nec consequat erat, dignissim vehicula lorem. Maecenas maximus augue quis tempor efficitur. Aenean' +
            ' lacinia, magna nec auctor porta, ante tellus ultrices neque, at luctus mauris erat eget dolor. Aenean quis purus facilisis, vestibulum nisi sed, pellentesque ligula.'
        },
        {
            id: '3',
            title: 'What is Lorem Ipsum?',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2017-02-27T24:00:00'),
            author: 'Kto-to',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' +
            ' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' +
            ' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ' +
            'in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus ' +
            'PageMaker including versions of Lorem Ipsum.'
        },
        {
            id: '4',
            title: 'LNullam efficitur lacus ut erat mattis mattis.',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2016-02-27T24:00:00'),
            author: 'Kto-to',
            content: 'LNullam efficitur lacus ut erat mattis mattis. Sed ac nisi sit amet augue consequat tincidunt vitae eu erat.' +
            ' Aliquam non diam cursus, semper quam id, lobortis diam. Etiam non fermentum eros. Sed nec eleifend sapien. Suspendisse congue ' +
            'pellentesque velit, non venenatis metus ullamcorper nec. Mauris vitae scelerisque lacus. In euismod odio ut magna tincidunt, vel cursus' +
            ' metus tristique. Donec tincidunt sapien eget tellus tempus, sed ornare orci volutpat. Mauris ut ornare metus. Nullam iaculis scelerisque' +
            ' sagittis. Vestibulum rhoncus et lacus ut auctor. Nunc enim tortor, consequat eu arcu sit amet, sagittis convallis felis.'
        },
        {
            id: '5',
            title: 'Классический текст Lorem Ipsum, используемый с XVI века',
            summary: 'Классический текст Lorem Ipsum, используемый с XVI века',
            createdAt: new Date('2017-05-27T24:00:00'),
            author: 'Lorem Ipsum',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut' +
            ' enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit' +
            ' in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: '6',
            title: 'de Finibus Bonorum et Malorum',
            summary: 'Абзац 1.10.32 de Finibus Bonorum et Malorum, написанный Цицероном в 45 году н.э',
            createdAt: new Date('2017-02-27T21:33:00'),
            author: 'Finibus Bonorum',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab' +
            ' illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur' +
            ' magni dolores eos qui ratione voluptatem sequi nesciunt.'
        },
        {
            id: '7',
            title: 'Английский перевод 1914 года, H. Rackham',
            summary: 'Английский перевод 1914 года, H. Rackham',
            createdAt: new Date('2014-02-27T24:00:00'),
            author: 'H. Rackham',
            content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will ' +
            'give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. ' +
            'No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. '
        },
        {
            id: '8',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2017-02-27T23:00:00'),
            author: 'Иванов Иван',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.'
        },
        {
            id: '9',
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2017-01-27T24:00:00'),
            author: 'Kto-to',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat in ipsum ut facilisis. Aliquam varius augue eget odio vehicula,' +
            ' vel viverra magna eleifend. In pharetra, ligula vitae fringilla molestie, justo turpis euismod massa, non malesuada eros ligula vel nisl. Maecenas' +
            ' in nibh egestas, rhoncus metus et, eleifend lorem. In neque metus, tempor id ultrices vestibulum, pulvinar quis nulla. Morbi convallis imperdiet imperdiet.' +
            ' Curabitur consequat mattis odio rutrum auctor. Nullam nec consequat erat, dignissim vehicula lorem. Maecenas maximus augue quis tempor efficitur. Aenean' +
            ' lacinia, magna nec auctor porta, ante tellus ultrices neque, at luctus mauris erat eget dolor. Aenean quis purus facilisis, vestibulum nisi sed, pellentesque ligula.'
        },
        {
            id: '10',
            title: 'What is Lorem Ipsum?',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2017-02-27T24:00:00'),
            author: 'Kto-to',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' +
            ' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' +
            ' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ' +
            'in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus ' +
            'PageMaker including versions of Lorem Ipsum.'
        },
        {
            id: '11',
            title: 'LNullam efficitur lacus ut erat mattis mattis.',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2016-02-27T24:00:00'),
            author: 'Kto-to',
            content: 'LNullam efficitur lacus ut erat mattis mattis. Sed ac nisi sit amet augue consequat tincidunt vitae eu erat.' +
            ' Aliquam non diam cursus, semper quam id, lobortis diam. Etiam non fermentum eros. Sed nec eleifend sapien. Suspendisse congue ' +
            'pellentesque velit, non venenatis metus ullamcorper nec. Mauris vitae scelerisque lacus. In euismod odio ut magna tincidunt, vel cursus' +
            ' metus tristique. Donec tincidunt sapien eget tellus tempus, sed ornare orci volutpat. Mauris ut ornare metus. Nullam iaculis scelerisque' +
            ' sagittis. Vestibulum rhoncus et lacus ut auctor. Nunc enim tortor, consequat eu arcu sit amet, sagittis convallis felis.'
        },
        {
            id: '12',
            title: 'Классический текст Lorem Ipsum, используемый с XVI века',
            summary: 'Классический текст Lorem Ipsum, используемый с XVI века',
            createdAt: new Date('2017-05-27T24:00:00'),
            author: 'Lorem Ipsum',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut' +
            ' enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit' +
            ' in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: '13',
            title: 'de Finibus Bonorum et Malorum',
            summary: 'Абзац 1.10.32 de Finibus Bonorum et Malorum, написанный Цицероном в 45 году н.э',
            createdAt: new Date('2017-02-27T21:33:00'),
            author: 'Finibus Bonorum',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab' +
            ' illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur' +
            ' magni dolores eos qui ratione voluptatem sequi nesciunt.'
        },
        {
            id: '14',
            title: 'Английский перевод 1914 года, H. Rackham',
            summary: 'Английский перевод 1914 года, H. Rackham',
            createdAt: new Date('2014-02-27T24:00:00'),
            author: 'H. Rackham',
            content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will ' +
            'give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. ' +
            'No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. '
        },
        {
            id: '15',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2017-02-27T23:00:00'),
            author: 'Иванов Иван',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.'
        },
        {
            id: '16',
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2017-01-27T24:00:00'),
            author: 'Kto-to',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat in ipsum ut facilisis. Aliquam varius augue eget odio vehicula,' +
            ' vel viverra magna eleifend. In pharetra, ligula vitae fringilla molestie, justo turpis euismod massa, non malesuada eros ligula vel nisl. Maecenas' +
            ' in nibh egestas, rhoncus metus et, eleifend lorem. In neque metus, tempor id ultrices vestibulum, pulvinar quis nulla. Morbi convallis imperdiet imperdiet.' +
            ' Curabitur consequat mattis odio rutrum auctor. Nullam nec consequat erat, dignissim vehicula lorem. Maecenas maximus augue quis tempor efficitur. Aenean' +
            ' lacinia, magna nec auctor porta, ante tellus ultrices neque, at luctus mauris erat eget dolor. Aenean quis purus facilisis, vestibulum nisi sed, pellentesque ligula.'
        },
        {
            id: '17',
            title: 'What is Lorem Ipsum?',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2017-02-27T24:00:00'),
            author: 'Kto-to',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' +
            ' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' +
            ' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ' +
            'in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus ' +
            'PageMaker including versions of Lorem Ipsum.'
        },
        {
            id: '18',
            title: 'LNullam efficitur lacus ut erat mattis mattis.',
            summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdAt: new Date('2016-02-27T24:00:00'),
            author: 'Kto-to',
            content: 'LNullam efficitur lacus ut erat mattis mattis. Sed ac nisi sit amet augue consequat tincidunt vitae eu erat.' +
            ' Aliquam non diam cursus, semper quam id, lobortis diam. Etiam non fermentum eros. Sed nec eleifend sapien. Suspendisse congue ' +
            'pellentesque velit, non venenatis metus ullamcorper nec. Mauris vitae scelerisque lacus. In euismod odio ut magna tincidunt, vel cursus' +
            ' metus tristique. Donec tincidunt sapien eget tellus tempus, sed ornare orci volutpat. Mauris ut ornare metus. Nullam iaculis scelerisque' +
            ' sagittis. Vestibulum rhoncus et lacus ut auctor. Nunc enim tortor, consequat eu arcu sit amet, sagittis convallis felis.'
        },
        {
            id: '19',
            title: 'Классический текст Lorem Ipsum, используемый с XVI века',
            summary: 'Классический текст Lorem Ipsum, используемый с XVI века',
            createdAt: new Date('2017-05-27T24:00:00'),
            author: 'Lorem Ipsum',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut' +
            ' enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit' +
            ' in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: '20',
            title: 'de Finibus Bonorum et Malorum',
            summary: 'Абзац 1.10.32 de Finibus Bonorum et Malorum, написанный Цицероном в 45 году н.э',
            createdAt: new Date('2017-02-27T21:33:00'),
            author: 'Finibus Bonorum',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab' +
            ' illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur' +
            ' magni dolores eos qui ratione voluptatem sequi nesciunt.'
        }
    ];

    function getId() {
        let temp = 1;
        for (let i = 0; i < articles.length; ++i) {
            if (temp < Number(articles[i].id)) {
                temp = Number(articles[i].id);
            }
        }
        temp += 1;
        return temp;
    }

    function compareDate(a, b) {
        a.createdAt = new Date(a.createdAt);
        b.createdAt = new Date(b.createdAt);
        if (a.createdAt < b.createdAt) {
            return 1;
        } else {
            return -1;
        }
    }

    function getArticles(begin, end) {
        let result = articles;
        result.sort(compareDate);
        result = result.slice(begin, end);
        return result;
    }

    function getLength() {
        return articles.length;
    }

    function getArticle(articleId) {
        for (let i = 0; i < articles.length; ++i) {
            if (articles[i].id == articleId) {
                return articles[i];
            }
        }
        return null;
    }

    function validateId(id) {
        let temp = 0;
        for (let i = 0; i < articles.length; ++i) {
            if (articles[i].id == id) {
                temp++;
            }
        }
        return temp <= 1;
    }

    function validateArticle(article) {
        const result = validateId(article.id) && article.title.length > 0 && article.title.length < 100 &&
            article.summary.length > 0 && article.summary.length < 200 &&
            new Date(article.createdAt) instanceof Date && article.author.length > 0 && article.content.length > 0;
        return Boolean(result);
    }

    function addArticle(newArticle) {
        if (validateArticle(newArticle)) {
            newArticle.createdAt = new Date(newArticle.createdAt);
            articles.push(newArticle);
            return true;
        } else {
            return false;
        }
    }

    function editArticle(id, newArticle) {
        let oldArtile = getArticle(id);
        if (validateId(id)) {
            if (newArticle.title.length > 0 && newArticle.title.length < 100) {
                oldArtile.title = newArticle.title;
            }
            if (newArticle.summary.length > 0 && newArticle.summary.length < 200) {
                oldArtile.summary = newArticle.summary;
            }
            if (newArticle.content.length > 0) {
                oldArtile.content = newArticle.content;
            }
            return true;
        } else {
            return false;
        }

    }

    function removeArticle(articleId) {
        for (let i = 0; i < articles.length; ++i) {
            if (articles[i].id == articleId) {
                articles.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    return {
        editArticle: editArticle,
        removeArticle: removeArticle,
        getArticles: getArticles,
        getArticle: getArticle,
        getLength: getLength,
        addArticle: addArticle,
        getId: getId,
        validateArticle: validateId
    };
}());

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
/*
 MongoClient.content('mongodb://localhost:27017/myapi', function (err, database) {
 if (err) {
 return console.log(err);
 }
 db = database;
 app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
 });

 });
 */