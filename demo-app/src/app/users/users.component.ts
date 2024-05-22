import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from '../_models/User';
import { UserService } from '../Services/user.service';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { environment } from '../../environments/environment.development';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UsersComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [UserService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  public Users: User[] = [];
  public addUserbool: any = false;
  public environmentInfo!: string;
  // public userContextFlag: any = false;


  public bdColor = {
    primary: false,
    danger: false,
    info: false,
    success: false,
  };

  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private _userService: UserService) { }

  ngOnDestroy(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    await this.init();
    this._userService.userListSubject$.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.Users = data;
        this.dataSource = data;
      } else {
        this.getUserAll();
      }
    });

  }

  public getUserAll(): void {
    this._userService.getUsers().subscribe({
      next: (value) => {
        this._userService.userListSubject$.next(value.data);
      },
      error: (err) => console.error(err),
    });
  }

  public openDialogAddUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
    });
  }

  public openDialogEditUser(item: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: { user: item },
    });
  }

  public openDialogDeleteUser(id: string): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { id },
    });
  }

  public AddUserBoolInfo = (value: any) => {
    console.log('UserBool: ', value);
    this.addUserbool = value;
  };

  public getMyEnvInfo = (value: any) => {
    console.log('Env: ', value);
    this.environmentInfo = value;
    this.bgColorChange(value);
  };

  public bgColorChange(envValue: string): void {
    switch (envValue) {
      case 'dev':
        this.bdColor.primary = true;
        this.bdColor.danger = false;
        this.bdColor.success = false;
        this.bdColor.info = false;
        break;
      case 'prod':
        this.bdColor.primary = false;
        this.bdColor.danger = false;
        this.bdColor.success = true;
        this.bdColor.info = false;
        break;
      case 'test':
        this.bdColor.primary = false;
        this.bdColor.danger = true;
        this.bdColor.success = false;
        this.bdColor.info = false;
        break;
      case 'uat':
        this.bdColor.primary = false;
        this.bdColor.danger = false;
        this.bdColor.success = false;
        this.bdColor.info = true;
        break;
      default:
        this.bdColor.primary = false;
        this.bdColor.danger = false;
        this.bdColor.success = false;
        this.bdColor.info = false;
        break;
    }
  }


  public async init() {
    const client = LDClient.initialize(environment.launchDarklyClientId, {
      key: 'anonymous',
    });
    await client.waitForInitialization();
    this.AddUserBoolInfo(await client.variation('addUserBool', false));
    this.getMyEnvInfo(await client.variation('demoEnv', 'dev'));
    client.on('change:addUserBool', this.AddUserBoolInfo);
    client.on('change:demoEnv', this.getMyEnvInfo);
  }

  // env test
  // public getUserContextFlag = (value: any) => {
  //   console.log('UserContextFlag: ', value);
  //   // this.userContextFlag = value;
  //   // this._userService.getUserContextFlag = value;
  // };

  // public async init() {
  //   const client = LDClient.initialize(environment.launchDarklyClientId, {
  //     key: 'production',
  //     kind: 'productionUser',
  //     name: 'productionUser',
  //     location: 'US',
  //     organization: 'EES-US'
  //   });
  //   // client = LDClient.initialize(environment.launchDarklyClientId, {
  //   //   key: 'developement',
  //   //   kind: 'developement',
  //   //   name: 'developmentUser',
  //   //   location: 'india',
  //   //   organization: 'EES'
  //   // });

  //   await client.waitForInitialization();
  //   this.AddUserBoolInfo(await client.variation('addUserBool', false));
  //   this.getMyEnvInfo(await client.variation('demoEnv', 'anything'));
  //   this.getUserContextFlag(await client.variation('userContextFlag', false));
  //   client.on('change:addUserBool', this.AddUserBoolInfo);
  //   client.on('change:demoEnv', this.getMyEnvInfo);
  //   client.on('change:userContextFlag', this.getUserContextFlag);
  // }

}
