import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserBase, AuthService } from 'src/app/core';

@Component({
  selector: 'app-header-my-profile',
  templateUrl: './header-my-profile.component.html',
  styleUrls: ['./header-my-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMyProfileComponent implements OnInit {
    toggleProfileMenu: boolean;
    user: UserBase;

   constructor(private authService: AuthService) {}

    ngOnInit() {
        this.user = this.authService.getUserProfile();
    }

    logOut(): void {
        this.authService.logOut();
    }

}
