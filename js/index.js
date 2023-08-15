document.addEventListener('DOMContentLoaded', () => {
    
    //fetches data from github API
    function fetchGitData(url) {
        return fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json());
    }

    //Displays search results
    function displayUsers(user) {
        const userList = document.getElementById('user-list');
        const userItem = document.createElement('li');
        userItem.innerHTML = `<img src="${user.avatar_url}" alt="${user.login}" width="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>`;

        userList.appendChild(userItem);
        userItem.addEventListener('click', () => showRepositories(user.login));
    }

    //Displays Repositories
    function showRepositories(username) {
        const reposList = document.getElementById('repos-list');
        reposList.innerHTML = '';

        fetchGitData(`https://api.github.com/users/${username}/repos`)
            .then(repos => {
                repos.forEach(repo => {
                    const repoItem = document.createElement('li');
                    repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                    reposList.appendChild(repoItem);
                });
            })

    }

    //Event Listener for search bar
    document.getElementById('github-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('search').value.trim();
        if (!searchInput) return;
    
        const url = `https://api.github.com/search/users?q=${searchInput}`;
        fetchGitData(url)
        .then(data => {
            const users = data.items;
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';
            users.forEach(displayUsers);
        })      
    });
})
