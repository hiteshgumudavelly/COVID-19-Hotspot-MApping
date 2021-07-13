import { Injectable } from "@angular/core";

@Injectable()
export class AlertService {
    private alertMessage: string = "";
    private recent : boolean = false;

    isRecent() : boolean {
        return this.recent;
    }

    setRecent(recent: boolean) : void {
        this.recent = recent;
    }

    getAlert() : string {
        return this.alertMessage;
    }

    setAlert(message: string): void {
        this.alertMessage = message;
    }

    clear(): void {
        this.alertMessage = "";
    }
}