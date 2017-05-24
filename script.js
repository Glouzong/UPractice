var loginModule = (function () {
    var nicknames = [
        {
            nickname: "Вася",
            password: "12345678"
        },
        {
            nickname: "Петя",
            password: "12345678"
        },
        {
            nickname: "Кто-то",
            password: "12345678"
        }
    ];

    function checkNickname() {
        var edit, i;
        edit = document.querySelector('.login');
        if (edit.innerHTML == "Выйти") {
            edit.innerHTML = "Войти";
            edit = document.querySelectorAll('.edit-news');
            for (i = 0; i < edit.length; ++i) {
                edit[i].style.display = 'none';
            }
            edit = document.querySelectorAll('.delete');
            for (i = 0; i < edit.length; ++i) {
                edit[i].style.display = 'none';
            }
            edit = document.querySelector('.button-pannel');
            edit.style.display = 'none';
            edit = document.querySelector('.add-news');
            edit.style.display = 'none';
            edit = document.querySelectorAll('.authorization');
            for (i = 0; i < edit.length; ++i) {
                edit[i].style.display = "inline-block";
            }
            edit = document.querySelector('.name');
            edit.style.display = 'none';

        } else {
            if (veracityLogin()) {
                edit.innerHTML = "Выйти";
                edit = document.querySelectorAll('.edit-news');
                for (i = 0; i < edit.length; ++i) {
                    edit[i].style.display = 'inline';
                }
                edit = document.querySelectorAll('.delete');
                for (i = 0; i < edit.length; ++i) {
                    edit[i].style.display = 'inline';
                }
                edit = document.querySelector('.button-pannel');
                edit.style.display = 'inline-block';
                edit = document.querySelectorAll('.authorization');
                for (i = 0; i < edit.length; ++i) {
                    edit[i].style.display = "none";
                }
                edit = document.querySelector('.name');
                edit.style.display = 'inline-block';
                edit.innerHTML = document.querySelector('.in-login').value;
            }
        }
        function veracityLogin() {
            var editLogin = document.querySelector('.in-login').value;
            var editPassword = document.querySelector('.password').value;
            for (var i = 0; i < nicknames.length; ++i) {
                if (nicknames[i].nickname == editLogin && nicknames[i].password == editPassword) {
                    return true;
                }
            }
            return false;
        }
    }

    return {
        checkNickname: checkNickname
    }
}());


var newsModel = (function () {
    var articles = [
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
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2017-01-27T24:00:00'),
            author: 'Kto-to',
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat in ipsum ut facilisis. Aliquam varius augue eget odio vehicula," +
            " vel viverra magna eleifend. In pharetra, ligula vitae fringilla molestie, justo turpis euismod massa, non malesuada eros ligula vel nisl. Maecenas" +
            " in nibh egestas, rhoncus metus et, eleifend lorem. In neque metus, tempor id ultrices vestibulum, pulvinar quis nulla. Morbi convallis imperdiet imperdiet." +
            " Curabitur consequat mattis odio rutrum auctor. Nullam nec consequat erat, dignissim vehicula lorem. Maecenas maximus augue quis tempor efficitur. Aenean" +
            " lacinia, magna nec auctor porta, ante tellus ultrices neque, at luctus mauris erat eget dolor. Aenean quis purus facilisis, vestibulum nisi sed, pellentesque ligula."
        },
        {
            id: '3',
            title: 'What is Lorem Ipsum?',
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2017-02-27T24:00:00'),
            author: 'Kto-to',
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" +
            " standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." +
            " It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised " +
            "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus " +
            "PageMaker including versions of Lorem Ipsum."
        },
        {
            id: '4',
            title: 'LNullam efficitur lacus ut erat mattis mattis.',
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2016-02-27T24:00:00'),
            author: 'Kto-to',
            content: "LNullam efficitur lacus ut erat mattis mattis. Sed ac nisi sit amet augue consequat tincidunt vitae eu erat." +
            " Aliquam non diam cursus, semper quam id, lobortis diam. Etiam non fermentum eros. Sed nec eleifend sapien. Suspendisse congue " +
            "pellentesque velit, non venenatis metus ullamcorper nec. Mauris vitae scelerisque lacus. In euismod odio ut magna tincidunt, vel cursus" +
            " metus tristique. Donec tincidunt sapien eget tellus tempus, sed ornare orci volutpat. Mauris ut ornare metus. Nullam iaculis scelerisque" +
            " sagittis. Vestibulum rhoncus et lacus ut auctor. Nunc enim tortor, consequat eu arcu sit amet, sagittis convallis felis."
        },
        {
            id: '5',
            title: "Классический текст Lorem Ipsum, используемый с XVI века",
            summary: "Классический текст Lorem Ipsum, используемый с XVI века",
            createdAt: new Date('2017-05-27T24:00:00'),
            author: "Lorem Ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut" +
            " enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit" +
            " in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: '6',
            title: 'de Finibus Bonorum et Malorum',
            summary: "Абзац 1.10.32 de Finibus Bonorum et Malorum, написанный Цицероном в 45 году н.э",
            createdAt: new Date('2017-02-27T21:33:00'),
            author: 'Finibus Bonorum',
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab" +
            " illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur" +
            " magni dolores eos qui ratione voluptatem sequi nesciunt."
        },
        {
            id: '7',
            title: 'Английский перевод 1914 года, H. Rackham',
            summary: "Английский перевод 1914 года, H. Rackham",
            createdAt: new Date('2014-02-27T24:00:00'),
            author: 'H. Rackham',
            content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will " +
            "give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. " +
            "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. "
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
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2017-01-27T24:00:00'),
            author: 'Kto-to',
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat in ipsum ut facilisis. Aliquam varius augue eget odio vehicula," +
            " vel viverra magna eleifend. In pharetra, ligula vitae fringilla molestie, justo turpis euismod massa, non malesuada eros ligula vel nisl. Maecenas" +
            " in nibh egestas, rhoncus metus et, eleifend lorem. In neque metus, tempor id ultrices vestibulum, pulvinar quis nulla. Morbi convallis imperdiet imperdiet." +
            " Curabitur consequat mattis odio rutrum auctor. Nullam nec consequat erat, dignissim vehicula lorem. Maecenas maximus augue quis tempor efficitur. Aenean" +
            " lacinia, magna nec auctor porta, ante tellus ultrices neque, at luctus mauris erat eget dolor. Aenean quis purus facilisis, vestibulum nisi sed, pellentesque ligula."
        },
        {
            id: '10',
            title: 'What is Lorem Ipsum?',
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2017-02-27T24:00:00'),
            author: 'Kto-to',
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" +
            " standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." +
            " It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised " +
            "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus " +
            "PageMaker including versions of Lorem Ipsum."
        },
        {
            id: '11',
            title: 'LNullam efficitur lacus ut erat mattis mattis.',
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2016-02-27T24:00:00'),
            author: 'Kto-to',
            content: "LNullam efficitur lacus ut erat mattis mattis. Sed ac nisi sit amet augue consequat tincidunt vitae eu erat." +
            " Aliquam non diam cursus, semper quam id, lobortis diam. Etiam non fermentum eros. Sed nec eleifend sapien. Suspendisse congue " +
            "pellentesque velit, non venenatis metus ullamcorper nec. Mauris vitae scelerisque lacus. In euismod odio ut magna tincidunt, vel cursus" +
            " metus tristique. Donec tincidunt sapien eget tellus tempus, sed ornare orci volutpat. Mauris ut ornare metus. Nullam iaculis scelerisque" +
            " sagittis. Vestibulum rhoncus et lacus ut auctor. Nunc enim tortor, consequat eu arcu sit amet, sagittis convallis felis."
        },
        {
            id: '12',
            title: "Классический текст Lorem Ipsum, используемый с XVI века",
            summary: "Классический текст Lorem Ipsum, используемый с XVI века",
            createdAt: new Date('2017-05-27T24:00:00'),
            author: "Lorem Ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut" +
            " enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit" +
            " in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: '13',
            title: 'de Finibus Bonorum et Malorum',
            summary: "Абзац 1.10.32 de Finibus Bonorum et Malorum, написанный Цицероном в 45 году н.э",
            createdAt: new Date('2017-02-27T21:33:00'),
            author: 'Finibus Bonorum',
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab" +
            " illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur" +
            " magni dolores eos qui ratione voluptatem sequi nesciunt."
        },
        {
            id: '14',
            title: 'Английский перевод 1914 года, H. Rackham',
            summary: "Английский перевод 1914 года, H. Rackham",
            createdAt: new Date('2014-02-27T24:00:00'),
            author: 'H. Rackham',
            content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will " +
            "give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. " +
            "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. "
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
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2017-01-27T24:00:00'),
            author: 'Kto-to',
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat in ipsum ut facilisis. Aliquam varius augue eget odio vehicula," +
            " vel viverra magna eleifend. In pharetra, ligula vitae fringilla molestie, justo turpis euismod massa, non malesuada eros ligula vel nisl. Maecenas" +
            " in nibh egestas, rhoncus metus et, eleifend lorem. In neque metus, tempor id ultrices vestibulum, pulvinar quis nulla. Morbi convallis imperdiet imperdiet." +
            " Curabitur consequat mattis odio rutrum auctor. Nullam nec consequat erat, dignissim vehicula lorem. Maecenas maximus augue quis tempor efficitur. Aenean" +
            " lacinia, magna nec auctor porta, ante tellus ultrices neque, at luctus mauris erat eget dolor. Aenean quis purus facilisis, vestibulum nisi sed, pellentesque ligula."
        },
        {
            id: '17',
            title: 'What is Lorem Ipsum?',
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2017-02-27T24:00:00'),
            author: 'Kto-to',
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" +
            " standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." +
            " It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised " +
            "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus " +
            "PageMaker including versions of Lorem Ipsum."
        },
        {
            id: '18',
            title: 'LNullam efficitur lacus ut erat mattis mattis.',
            summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
            createdAt: new Date('2016-02-27T24:00:00'),
            author: 'Kto-to',
            content: "LNullam efficitur lacus ut erat mattis mattis. Sed ac nisi sit amet augue consequat tincidunt vitae eu erat." +
            " Aliquam non diam cursus, semper quam id, lobortis diam. Etiam non fermentum eros. Sed nec eleifend sapien. Suspendisse congue " +
            "pellentesque velit, non venenatis metus ullamcorper nec. Mauris vitae scelerisque lacus. In euismod odio ut magna tincidunt, vel cursus" +
            " metus tristique. Donec tincidunt sapien eget tellus tempus, sed ornare orci volutpat. Mauris ut ornare metus. Nullam iaculis scelerisque" +
            " sagittis. Vestibulum rhoncus et lacus ut auctor. Nunc enim tortor, consequat eu arcu sit amet, sagittis convallis felis."
        },
        {
            id: '19',
            title: "Классический текст Lorem Ipsum, используемый с XVI века",
            summary: "Классический текст Lorem Ipsum, используемый с XVI века",
            createdAt: new Date('2017-05-27T24:00:00'),
            author: "Lorem Ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut" +
            " enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit" +
            " in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: '20',
            title: 'de Finibus Bonorum et Malorum',
            summary: "Абзац 1.10.32 de Finibus Bonorum et Malorum, написанный Цицероном в 45 году н.э",
            createdAt: new Date('2017-02-27T21:33:00'),
            author: 'Finibus Bonorum',
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab" +
            " illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur" +
            " magni dolores eos qui ratione voluptatem sequi nesciunt."
        }
    ];

    function getId() {
        var temp = 1;
        for (var i = 0; i < articles.length; ++i) {
            if (temp < articles[i].id) {
                temp = articles[i].id;
            }
        }
        return temp + 1;
    }

    function compareDate(a, b) {
        if (a.createdAt < b.createdAt) {
            return 1;
        } else {
            return -1;
        }
    }

    function getArticles(begin, end) {
        var result = articles;
        result.sort(compareDate);
        result = result.slice(begin, end);
        return result;
    }

    function getLength() {
        var temp = articles.length;
        return articles.length;
    }

    function getArticle(articleId) {
        for (var i = 0; i < articles.length; ++i) {
            if (articles[i].id == articleId) {
                return articles[i];
            }
        }
        return null;
    }

    function validateId(id) {
        var temp = 0;
        for (var i = 0; i < articles.length; ++i) {
            if (articles[i].id == id) {
                temp++;
            }
        }
        if (temp > 0) {
            return false;
        } else {
            return true;
        }
    }

    function validateArticle(article) {
        if (validateId(article.id) && article.title.length > 0 && article.title.length < 100 &&
            article.summary.length > 0 && article.summary.length < 200 &&
            article.createdAt instanceof Date && article.author.length > 0 && article.content.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function addArticle(newArticle) {
        if (validateArticle(newArticle, articles)) {
            articles.push(newArticle);
            return true;
        } else {
            return false;
        }
    }

    function editArticle(id, newArticle) {
        var oldArtile = getArticle(id, articles);
        if (validateId(id, articles)) {
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
        for (var i = 0; i < articles.length; ++i) {
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
    }
}());

var showNewsModel = (function () {
    function showNews(left, right, visible) {
        var news = newsModel.getArticles(left, right);
        var tempArticle = document.querySelector('.news-module');
        var parent = document.querySelector('.news-body');
        for (var i = 0; i < news.length; ++i) {
            var temp = tempArticle.content.cloneNode(true);
            select(news[i], temp.querySelector('.news'), visible);
            parent.appendChild(temp);
        }
    }

    var nextNumberNews = 6;

    function showMore() {
        if (nextNumberNews + 6 < newsModel.getLength()) {
            showNews(nextNumberNews, nextNumberNews + 6, true);
            nextNumberNews += 7;
        } else {
            var delta = newsModel.getLength() - nextNumberNews;
            if (delta > 0) {
                showNews(nextNumberNews, nextNumberNews + delta);
                nextNumberNews += delta;
            } else {
                document.querySelector('.show-more').style.display = 'none';
            }
        }
    }

    function select(news, div, visible) {
        div.querySelector('.head2').innerHTML = news.title;
        div.querySelector('.text').innerHTML = news.summary;
        div.querySelector('.data').innerHTML = gateDate(news.createdAt);
        div.querySelector('.author').innerHTML = news.author;
        div.querySelector('.show-full').addEventListener('click', function () {
            showNormal(news, div)
        });
        div.querySelector('.delete').addEventListener('click', function () {
            removeNews(news.id);
        });
        div.querySelector('.edit-news').addEventListener('click', function () {
            editNews(news.id);
        });
        if (visible) {
            div.querySelector('.delete').style.display = 'inline';
            div.querySelector('.edit-news').style.display = 'inline';
        }
    }

    function gateDate(data) {
        return data.getDate() + '.' + (data.getMonth() + 1) + '.' + data.getFullYear();
    }

    function showFull(news, div) {
        div.querySelector('.text').innerHTML = news.content;
        div.querySelector('.show-full').removeEventListener('click', function () {
            showFull(news, div)
        });
        div.querySelector('.show-full').addEventListener('click', function () {
            showNormal(news, div)
        });
    }

    function showNormal(news, div) {
        div.querySelector('.text').innerHTML = news.summary;
        div.querySelector('.show-full').removeEventListener('click', function () {
            showNormal(news, div)
        });
        div.querySelector('.show-full').addEventListener('click', function () {
            showFull(news, div)
        });
    }

    function removeArray() {
        var array = document.querySelectorAll('.news');
        var parent = document.querySelector('.news-body');
        for (var i = 0; i < array.length; ++i) {
            parent.removeChild(array[i]);
        }
    }

    function addNews() {
        var temp = document.querySelector('.add-news').style.display;
        if (temp == 'none') {
            showAddNews();
        } else {
            var article = {
                createdAt: new Date(),
                id: newsModel.getId(),
                author: document.querySelector('.name').innerHTML,
                title: document.querySelector('.name-news').value,
                summary: document.querySelector('.short-news').value,
                content: document.querySelector('.long-news').value
            };
            removeArray();
            newsModel.addArticle(article);
            showNews(0, nextNumberNews, true);
            showAddNews();
        }
    }

    function removeNews(id) {
        removeArray();
        newsModel.removeArticle(id);
        showNews(0, nextNumberNews, true);
    }

    function editNews(id) {
        var temp = document.querySelector('.add-news').style.display = 'inline-block';
        var tempArticles = newsModel.getArticle(id);
        document.querySelector('.name-news').value = tempArticles.title;
        document.querySelector('.short-news').value = tempArticles.summary;
        document.querySelector('.long-news').value = tempArticles.content;
        newsModel.removeArticle(id);
        // var article = {
        //     createdAt: new Date(),
        //     id: newsModel.getId(),
        //     author: document.querySelector('.name').innerHTML,
        //     title: document.querySelector('.name-news').value,
        //     summary: document.querySelector('.short-news').value,
        //     content: document.querySelector('.long-news').value
        // };
        removeArray();
        //newsModel.editArticle(id, newArticle);
        showNews(0, nextNumberNews);
    }

    function showAddNews() {
        var temp = document.querySelector('.add-news');
        if (temp.style.display == 'inline-block') {
            temp.style.display = 'none';
        } else {
            temp.style.display = 'inline-block';
        }
    }

    return {
        showNews: showNews,
        removeNews: removeNews,
        showMore: showMore,
        addNews: addNews,
        editNews: editNews
    }
}());
console.log(showNewsModel.showNews(0, 6, false));
document.querySelector('.in-login').value = 'Кто-то';
document.querySelector('.password').value = '12345678';
loginModule.checkNickname();
// console.log(showNewsModel.addNews({
//     id: '21',
//     title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
//     summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
//     createdAt: new Date('2013-02-27T23:00:00'),
//     author: 'Иванов Иван',
//     content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.'
// }));
// console.log(showNewsModel.removeNews(3));
// console.log(showNewsModel.editNews  ("5",{title: "new title", summary: "new summary", content: "new content"}));
