let userSearch = document.querySelector("#github-form")
let userUl = document.querySelector("#user-list")
let repoUl = document.querySelector("#repos-list")

userSearch.addEventListener("submit", (event) => {
    userUl.innerHTML = ""
    event.preventDefault()
    let user = event.target.search.value
    fetch(`https://api.github.com/search/users?q=${user}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(r => r.json())
    .then((response) => {
        let users = response.items
        users.forEach((user) => {
            renderUser(user)
        })
    })
    event.target.reset()
})

let renderUser = (user) => {
    let userLi = document.createElement("li")

    let username = document.createElement("h3")
    username.innerHTML = user.login

    let avatar = document.createElement("img")
    avatar.src = user.avatar_url

    let profile = document.createElement("a")
    profile.href = user.html_url
    profile.innerHTML = "<p>Profile</p>"

    userLi.append(username, avatar, profile)
    userUl.append(userLi)

    username.addEventListener("click", (event) => {
        repoUl.innerHTML = ""
        fetch(`https://api.github.com/users/${user.username}/repos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(r => r.json())
        .then((repos) => {
            repos.forEach((repo) => {
                renderRepo(repo)
        })
    })
})
}

    let renderRepo = (repo) => {
        let repoLi = document.createElement("li")

    let reponame = document.createElement("a")
    reponame.href = repo.html_url
    reponame.innerText = repo.name

    repoLi.append(reponame)
    repoUl.append(repoLi)
    }