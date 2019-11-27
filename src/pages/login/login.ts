import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { SignupPage } from '../signup/signup'
// import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Storage } from '@ionic/storage'

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	loginForm: FormGroup
	loginError: string
	public oldemail: any

	constructor(
		public navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder,
		public storage: Storage
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: [
				'',
				Validators.compose([Validators.required, Validators.minLength(6)])
			]
		})
	}

	login() {
		let data = this.loginForm.value

		if (!data.email) return

		this.saveLastEmail(data.email)

		let credentials = {
			email: data.email,
			password: data.password
		}
		this.auth.signInWithEmail(credentials).then(
			() => this.navCtrl.setRoot(HomePage),
			error => (this.loginError = error.message)
		)
	}

	signup() {
		this.navCtrl.push(SignupPage)
	}

	saveLastEmail(email) {
		this.storage.set('lastEmail', email)
	}

	ionViewDidLoad() {
		this.getLastEmail()
	}

	getLastEmail() {
		this.storage
			.get('lastEmail')
			.then(val => {
				console.log(val)
				this.oldemail = val
			})
			.catch(err => {
				console.log('no such')
			})
	}
}
