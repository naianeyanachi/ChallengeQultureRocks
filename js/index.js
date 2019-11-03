/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.listUsers();
    },
    getUrlParams: function() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    },
    populateTable: function (params, data){
        var users = document.getElementById("listUsers");
        var header = users.createTHead();
        var row = header.insertRow(-1);
        row.classList.add("header");
        var cellName = document.createElement('th');
        cellName.innerHTML = "Name"
        cellName.scope = "col";
        var cellJobTitle = document.createElement('th');
        cellJobTitle.innerHTML = "Job Title"
        cellJobTitle.scope = "col";
        var cellDate = document.createElement('th');
        cellDate.innerHTML = "Admission date"
        cellDate.scope = "col";
        var cellEmail = document.createElement('th');
        cellEmail.innerHTML = "Email"
        cellEmail.scope = "col";
        
        row.appendChild(cellName);
        row.appendChild(cellJobTitle);
        row.appendChild(cellDate);
        row.appendChild(cellEmail);
        
        
        var body = users.createTBody();
        data.users.forEach(function(user, index){
            var newRow = body.insertRow();
            if(index % 2 == 0){
                newRow.classList.add("par");
            } else {
                newRow.classList.add("impar");
            }

            cellName = newRow.insertCell(0);
            cellName.innerHTML = user.name;
            cellJobTitle = newRow.insertCell(1);
            cellJobTitle.innerHTML = user.job_title;
            cellDate = newRow.insertCell(2);
            cellDate.innerHTML = user.admission_date;
            cellEmail = newRow.insertCell(3);
            cellEmail.innerHTML = user.email;

        });
    },
    getPage: function (params, data){
        var page = params["page"];
        if (params["page"]==null) {
            page = 1;
        }
        data.users = data.users.slice(((page - 1)*10),(page*10));
        
        return data;
    },
    createNavigation: function(params, data) {
        //create dropdown
        var pageSelector = document.createElement("select");
        pageSelector.id = "pageSelector"
        pageSelector.classList.add("btn");
        pageSelector.classList.add("btn-secondary");
        
        pages = Math.ceil(data.users.length / 10)
        
        for(var i = 1; i <= pages; i++){
            option = new Option(i, i);
            pageSelector.appendChild(option);
        }
        pageSelector.value = params["page"];
        
        
        //create nav buttons, if necessary
        if (params["page"] > 1){
            var buttonFirst = document.createElement("BUTTON");
            buttonFirst.id = "btnFirst";
            buttonFirst.innerHTML = "<<";
            buttonFirst.classList.add("btn");
            buttonFirst.classList.add("btn-secondary");
            
            var buttonBack = document.createElement("button");
            buttonBack.id = "btnBack";
            buttonBack.innerHTML = "<";
            buttonBack.classList.add("btn");
            buttonBack.classList.add("btn-secondary");
            
            document.getElementById("navigation").appendChild(buttonFirst);
            document.getElementById("navigation").appendChild(buttonBack);
            document.getElementById('btnFirst').addEventListener('click',function() {app.changePage(1)});
            document.getElementById('btnBack').addEventListener('click',function() {app.changePage(parseInt(params["page"]) - 1)});
        }
        
        //add dropdown in the middle of buttons
        document.getElementById("navigation").appendChild(pageSelector);
        document.getElementById('pageSelector').addEventListener('change',this.onChange);   
        
        if (params["page"] < pages){
            var buttonLast = document.createElement("BUTTON");
            buttonLast.id = "btnLast";
            buttonLast.innerHTML = ">>";
            buttonLast.classList.add("btn");
            buttonLast.classList.add("btn-secondary");
            
            var buttonForward = document.createElement("BUTTON");
            buttonForward.id = "btnForward";
            buttonForward.innerHTML = ">";
            buttonForward.classList.add("btn");
            buttonForward.classList.add("btn-secondary");
            
            document.getElementById("navigation").appendChild(buttonForward);
            document.getElementById("navigation").appendChild(buttonLast);
            document.getElementById('btnLast').addEventListener('click',function() {app.changePage(pages)});
            document.getElementById('btnForward').addEventListener('click', function() {app.changePage(parseInt(params["page"]) + 1)}, false);
        }
        
        
    },
    listUsers: function (){
        var params = this.getUrlParams();
        
        var request = new XMLHttpRequest();
        request.open('GET', 'https://qr-challenge.herokuapp.com/api/v1/users', true);
        request.onload = function() {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
            data = app.filterUsers(params, data);
            app.createNavigation(params, data);
            data = app.getPage(params, data);
            app.populateTable(params, data);
            
        }
        request.send();
    },
    filterUsers: function(params, data) {
        var search_params = params["s"];
        if (search_params != null) {
            var filtered = data.users.filter(function(value, index, users){
                return value.name.includes(search_params) || value.job_title.includes(search_params) || value.email.includes(search_params);
            });
            data.users = filtered;
        }
        return data;
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('btnSearch').addEventListener('click', this.onClickSearch);
        document.getElementById('btnNewUser').addEventListener('click', this.onClickNewUser);
    },
    changePage: function(page) {
        var query_string = window.location.search;
        var page_params = new URLSearchParams(query_string); 
        page_params.set('page', page);
        window.location.search = page_params.toString();
    },
    onChange: function() {
        var newPage = document.getElementById('pageSelector').value;
        app.changePage(newPage);
        
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onClickSearch: function() {
        var query_string = window.location.search;
        var search_params = new URLSearchParams(query_string); 
        search_params.set('s', document.getElementById('txtSearch').value);
        window.location.search = search_params.toString();
    },
    onClickNewUser: function() {
        window.location.href = "addUser.html";
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
