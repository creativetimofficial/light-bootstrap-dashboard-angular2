import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-lists',
  templateUrl: './users-lists.component.html',
  styleUrls: ['./users-lists.component.scss']
})
export class UsersListsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  users = [
    { nom: 'Farah Jamoussi', email: 'farah@example.com', role: 'Admin' },
    { nom: 'Ali Mehdi', email: 'mehdi@example.com', role: 'Auteur' },
  ];

}
