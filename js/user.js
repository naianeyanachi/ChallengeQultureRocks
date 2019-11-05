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
        createNavComponent();
        this.loadUser();
    },
    bindEvents: function() {
        //ne events to bind
    },
    getUrlParams: function() {
        //separate params from url
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    },
    loadUser: function() {
        var userRequest = new XMLHttpRequest();
        var commentsRequest = new XMLHttpRequest();
        var params = this.getUrlParams();
        
        //load user info
        userRequest.open('GET', 'https://qr-challenge.herokuapp.com/api/v1/users/' + params["id"], true);
        userRequest.onload = function() {
            var data = JSON.parse(this.response);
            console.log("data");
            app.showUser(data);
        }
        userRequest.send();
        
        //load comments if any
        commentsRequest.open('GET', 'https://qr-challenge.herokuapp.com/api/v1/users/'+params["id"]+'/comments', true);
        commentsRequest.onload = function() {
            var data = JSON.parse(this.response);
            app.showComments(data);
        }
        commentsRequest.send();
    },
    showUser: function(data) {
        //display user info
        document.getElementById("txtName").innerHTML = data.user.name;
        document.getElementById("txtAdmissionDate").innerHTML = data.user.admission_date;
        document.getElementById("txtJobTitle").innerHTML = data.user.job_title;
        document.getElementById("txtEmail").innerHTML = data.user.email;
        document.getElementById("img").src = data.user.photo_url;
    },
    showComments: function(data) {
        //display comments if any
        var commentSection = document.getElementById("comments");
        var ul = document.createElement("ul");
        ul.classList.add("list-group");
        var li;
        
        if (data.comments.length == 0) {
            li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = "No comments to show";
            ul.appendChild(li);
        }
        
        data.comments.forEach(function(comment, index){
            li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = comment.value;
            ul.appendChild(li);
        });
        
        commentSection.appendChild(ul);
    }
};
