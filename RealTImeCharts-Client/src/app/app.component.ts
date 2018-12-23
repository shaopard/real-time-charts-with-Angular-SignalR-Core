import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'RealTImeCharts-Client';
    private chartAPIUrl: string = "https://localhost:44336/api/chart";

    public chartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public chartLabels: string[] = ["Real time data for the chart"];
    public chartType: string = "bar";
    public chartLegend: boolean = true;
    public colors: any[] = [{ backgroundColor: "#5491DA" }, { backgroundColor: "#E74C3C" }, { backgroundColor: "#82E0AA" }, { backgroundColor: "#E5E7E9" }]

    constructor(public signalRService: SignalRService, private http: HttpClient) {}

    ngOnInit() {
        this.signalRService.startConnection();
        this.signalRService.addTransferChartDataListener();
        this.signalRService.addBroadcastChartDataListener();
        this.startHttpRequest();
    }

    public chartClicked(event) {
        console.log(event);
        this.signalRService.broadCastChartData()
    }

    private startHttpRequest() {
        this.http.get(this.chartAPIUrl)
            .subscribe(result => {
                console.log(result);
            });
    }
}
