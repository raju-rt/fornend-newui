import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
@Component({
  selector: 'app-projects-pop',
  templateUrl: './projects-pop.component.html',
  styleUrls: ['./projects-pop.component.css']
})
export class ProjectsPopComponent implements OnInit, OnChanges {
  epsData: any = [];
  selectedProj: {};
  @Input() projid: any;

  @Output() update = new EventEmitter<any>();
  projectList: any = [];
  itemid: any = 1;
  expand: any = true;
  constructor(private _service: ApiService) { }
  ngOnInit() {

  }
  ngOnChanges() {
    if (this.projid) {
      this.getDetails();
    } else {
      $('#getprojects').modal('hide');
    }
  }
  getDetails() {
    this._service.PostService({ 'status': 1 }, '/projectlib/getEPSUserProjects')
      .subscribe(data => {
        this.projectList = data.epsProjs;
        this.epsData = this.getProjs(this.projectList, this.itemid, this.expand);
        console.log(data);
        $('#getprojects').modal('show');
      });
  }
  recursive(obj, newObj, level, itemId, isExpand) {
    const self = this;
    obj.forEach(function (o) {
      if (o.childProjs && o.childProjs.length !== 0) {
        o.level = level;
        o.leaf = false;
        newObj.push(o);
        if (o.projId === itemId) {
          o.expand = isExpand;
        }
        if (o.expand === true) {
          self.recursive(o.childProjs, newObj, o.level + 1, itemId, isExpand);
        }
      } else {
        o.level = level;
        if (o.proj) {
          newObj.push(o);
          o.leaf = true;
        } else {
          obj.splice(obj.indexOf(o), 1);
        }
        return false;
      }
    });
  }
  getProjs(obj, itemId, isExpand) {
    let newObj = [];
    this.recursive(obj, newObj, 0, itemId, isExpand);
    let sample = newObj.filter(function (val) {
      if (!val.proj) {
        if (val.childProjs.length > 0) {
          return val;
        } else {

        }
      } else {
        return val;
      }
    })
    return sample;
  }
  selectEPSProject(a) {
    this.update.emit({
      selectedProj: a
    }
    );
    $('#getprojects').modal('hide');
    console.log(a);
  }
  getid(id, exp) {
    this.itemid = id;
    this.expand = !exp;
    this.getDetails();
  }
  reset() {
    $('#getprojects').modal('hide');
  }
}
