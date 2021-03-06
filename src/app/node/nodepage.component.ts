import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { NodeService } from './node.service';
import { LoadingService } from '../_services/loading.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nodepage',
  templateUrl: './nodepage.component.html',
  styleUrls: ['./nodepage.component.less']
})
export class NodepageComponent implements OnInit {
  errorMessage: string;
  node: any;
  selectedIndex: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private _nodeService: NodeService,
    private loadingService: LoadingService,
    private authService: AuthenticationService
  ) { }  

  ngOnInit() {
    this._nodeService.node.subscribe(value => {
      if (value != null && value != undefined) {
          this.node = value
      }
    })

    this.route.params.subscribe(
      params => {
        if (params['id'] && params['type']) {
          this._nodeService.getNodeDetails(params['id'], params['type'])
        }
      }
    );
  }

  onTabChanged (e) {
    this.selectedIndex = e.index
  }

  showContent () {
    if (this.node.node_type == 'Topic') {
      return this.selectedIndex == 0 || this.selectedIndex == undefined || this.selectedIndex == null
    } else {
      return this.selectedIndex == 1
    }
  }


}
