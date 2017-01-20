import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
@Component({
  providers: [UserService],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
 	users: User[];
    userService: UserService;
    newUserName = '';
    errorMessage = '';
    
  constructor(userService: UserService ) {
        this.userService = userService;
        this.users = [];
        this.list(); // enforce model to be populated on reload
  }

  add() {
      var tempUserName = this.newUserName;
      this.newUserName= '';

      this.userService.add(tempUserName)
                     .subscribe(
                       user  => {
                        this.users.push(
                         new User(user.id, tempUserName)) 
                       },
                       error =>  this.errorMessage = <any>error);
  }

  remove(id : number) {
      this.userService.remove(id)
                     .subscribe(
                       user  => {
                          var index = this.users.map(user => user.id).indexOf(id);
                          this.users.splice(index,1);

                        },
                       error =>  this.errorMessage = <any>error);
  }

  list() {
      this.userService.list()
                     .subscribe(
                       users  => {
                         console.log(users);
                         for(var x in users){
                            this.users.push(users[x]);
                          }  
                        // this.users.push(users);
                       },
                       error =>  this.errorMessage = <any>error);
  }
}
