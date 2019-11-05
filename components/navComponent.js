var createNavComponent = function (){
    var nav = document.createElement("div");
    nav.classList.add("nav");
    nav.classList.add("navbar-dark");
    nav.classList.add("bg-dark");
    
    
    var brand = document.createElement("a");
    brand.href = "index.html";
    brand.classList.add("navbar-brand");
    brand.classList.add("nav-link");
    brand.innerHTML = "Qulture.Rocks";
    
    nav.appendChild(brand);
    
    var link1 = document.createElement("a");
    link1.href = "index.html";
    link1.classList.add("nav-item");
    link1.classList.add("nav-link");
    link1.innerHTML = "Users List";
    
    var link2 = document.createElement("a");
    link2.href = "addUser.html";
    link2.classList.add("nav-item");
    link2.classList.add("nav-link");
    link2.innerHTML = "Add new User";
    
    nav.appendChild(link1);
    nav.appendChild(link2);
    
    document.getElementById("divNav").appendChild(nav);
    
}