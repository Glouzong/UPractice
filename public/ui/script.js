const loginModule = (function () {

    function checkNickname() {
        let edit, i;
        edit = document.querySelector('.login');
        if (edit.innerHTML == 'Выйти') {
            edit.innerHTML = 'Войти';
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
                edit[i].style.display = 'inline-block';
            }
            edit = document.querySelector('.name');
            edit.style.display = 'none';

        } else {
            if (communicationWithServer.veracityLogin(document.querySelector('.in-login').value,
                    document.querySelector('.password').value)) {
                edit.innerHTML = 'Выйти';
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
                    edit[i].style.display = 'none';
                }
                edit = document.querySelector('.name');
                edit.style.display = 'inline-block';
                edit.innerHTML = document.querySelector('.in-login').value;
            }
        }
    }

    return {
        checkNickname: checkNickname
    };
}());

const communicationWithServer = (function () {
    let hreq = new XMLHttpRequest();

    function veracityLogin(login, password) {
        hreq.open('GET', '/veracityLogin?login=' + login + '&password=' + password, false);
        hreq.send();
        return JSON.parse(hreq.responseText);
    }

    function getArticles(begin, end) {
        hreq.open('GET', '/getArticles?begin=' + begin + '&end=' + end, false);
        hreq.send();
        return JSON.parse(hreq.responseText);
    }

    function getArticle(id) {
        hreq.open('GET', '/getArticle?id=' + id, false);
        hreq.send();
        return JSON.parse(hreq.responseText);
    }

    function getLength() {
        hreq.open('GET', '/getLength', false);
        hreq.send();
        return Number(JSON.parse(hreq.responseText));
    }

    function getId() {
        hreq.open('GET', '/getId', false);
        hreq.send();
        return Number(JSON.parse(hreq.responseText));
    }

    function removeArticle(newsId) {
        hreq.open('DELETE', '/removeArticle?newsId=' + newsId, false);
        hreq.send();
    }

    function addArticle(article) {
        hreq.open('POST', '/addArticle', false);
        hreq.setRequestHeader('content-type', 'application/json');
        hreq.send(JSON.stringify(article));
    }

    return {
        veracityLogin: veracityLogin,
        getArticles: getArticles,
        getArticle: getArticle,
        getLength: getLength,
        getId: getId,
        removeArticle: removeArticle,
        addArticle: addArticle

    };
}());

const showNewsModel = (function () {
    function showNews(left, right, visible) {
        const news = communicationWithServer.getArticles(left, right);
        const tempArticle = document.querySelector('.news-module');
        const parent = document.querySelector('.news-body');
        for (let i = 0; i < news.length; ++i) {
            const temp = tempArticle.content.cloneNode(true);
            select(news[i], temp.querySelector('.news'), visible);
            parent.appendChild(temp);
        }
    }

    let nextNumberNews = 6;

    function showMore() {
        if (nextNumberNews + 6 < communicationWithServer.getLength()) {
            showNews(nextNumberNews, nextNumberNews + 6, true);
            nextNumberNews += 7;
        } else {
            const delta = communicationWithServer.getLength() - nextNumberNews;
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
            showNormal(news, div);
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
        data = new Date(data);
        return data.getDate() + '.' + (data.getMonth() + 1) + '.' + data.getFullYear();
    }

    function showFull(news, div) {
        div.querySelector('.text').innerHTML = news.content;
        div.querySelector('.show-full').removeEventListener('click', function () {
            showFull(news, div);
        });
        div.querySelector('.show-full').addEventListener('click', function () {
            showNormal(news, div);
        });
    }

    function showNormal(news, div) {
        div.querySelector('.text').innerHTML = news.summary;
        div.querySelector('.show-full').removeEventListener('click', function () {
            showNormal(news, div);
        });
        div.querySelector('.show-full').addEventListener('click', function () {
            showFull(news, div);
        });
    }

    function removeArray() {
        const array = document.querySelectorAll('.news');
        const parent = document.querySelector('.news-body');
        for (let i = 0; i < array.length; ++i) {
            parent.removeChild(array[i]);
        }
    }

    function addNews() {
        const temp = document.querySelector('.add-news').style.display;
        if (temp == 'none') {
            showAddNews();
        } else {
            const article = {
                createdAt: new Date(),
                id: communicationWithServer.getId(),
                author: document.querySelector('.name').innerHTML,
                title: document.querySelector('.name-news').value,
                summary: document.querySelector('.short-news').value,
                content: document.querySelector('.long-news').value
            };
            removeArray();
            communicationWithServer.addArticle(article);
            showNews(0, nextNumberNews, true);
            showAddNews();
        }
    }

    function removeNews(id) {
        removeArray();
        communicationWithServer.removeArticle(id);
        showNews(0, nextNumberNews, true);
    }

    function editNews(id) {
        document.querySelector('.add-news').style.display = 'inline-block';
        const tempArticles = communicationWithServer.getArticle(id);
        document.querySelector('.name-news').value = tempArticles.title;
        document.querySelector('.short-news').value = tempArticles.summary;
        document.querySelector('.long-news').value = tempArticles.content;
        communicationWithServer.removeArticle(id);
        // var article = {
        //     createdAt: new Date(),
        //     id: communicationWithServer.getId(),
        //     author: document.querySelector('.name').innerHTML,
        //     title: document.querySelector('.name-news').value,
        //     summary: document.querySelector('.short-news').value,
        //     content: document.querySelector('.long-news').value
        // };
        removeArray();
        //communicationWithServer.editArticle(id, newArticle);
        showNews(0, nextNumberNews);
    }

    function showAddNews() {
        let temp = document.querySelector('.add-news');
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
    };
}());

showNewsModel.showNews(0, 6, false);
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
// console.log(showNewsModel.editNews  ('5',{title: 'new title', summary: 'new summary', content: 'new content'}));
