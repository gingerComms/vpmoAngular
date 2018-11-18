import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { NodeService } from './node.service';
import { LoadingService } from '../_services/loading.service';

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
          private loadingService: LoadingService
          ) { }  

  ngOnInit() {
    this.loadingService.show()

    this._nodeService.node.subscribe(value => {
      if (value !== null) {
          this.node = value
          this.loadingService.hide()
      }
    })

    this.route.params.subscribe(
      params => {
        this._nodeService.getNodeDetails(params['id'])
      }
    );
    
    
    // this.nodeType = localStorage.getItem('nodeType');
    
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
