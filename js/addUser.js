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
    },
    bindEvents: function() {
        document.getElementById('btnNewUser').addEventListener('click',this.onClickNewUser);
    },
    onClickNewUser: function() {
        var request = new XMLHttpRequest();

        
        request.open('POST', 'https://qr-challenge.herokuapp.com/api/v1/users', true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        //get entry
        var send = {
            "user": {
                "name": document.getElementById('txtName').value,
                "email": document.getElementById('txtEmail').value,
                "job_title": document.getElementById('txtJobTitle').value,
                "admission_date": document.getElementById('txtAdmissionDate').value,
                "photo_url": document.getElementById('txtPhotoURL').value
            }
        }
        
        //check if user was created in database
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("User created with success");
            } else if (this.readyState == 4){
                alert("Error " + this.status + ": " + this.statusText);
            }
        };
        
        //send entry
        request.send(JSON.stringify(send));
    }
};
