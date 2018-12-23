import { Injectable } from '@angular/core';
import { ChartModel } from '../_interfaces/chartdata.model';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
    public data: ChartModel[];
    public broadcastedData: ChartModel[];

    private hubConnection: signalR.HubConnection;
    private signalRUrl: string = "https://localhost:44336/chart";

    public startConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
                                    .withUrl(this.signalRUrl)
                                    .configureLogging(signalR.LogLevel.Information)
                                    .build();

        this.hubConnection
            .start()
            .then(() => console.log("Connection started"))
            .catch(err => { debugger; console.log("Error while starting connection: " + err); });
    }

    public addTransferChartDataListener = () => {
        this.hubConnection.on("transferchartdata", (data) => {
            this.data = data;
            console.log(data);
        })
    }

    public broadCastChartData() {
        this.hubConnection.invoke("broadcastchartdata", this.data)
            .catch(err => console.error(err));
    }

    public addBroadcastChartDataListener() {
        this.hubConnection.on("broadcastchartdata", (data) => {
            this.broadcastedData = data;
        })
    }
}
