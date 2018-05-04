import { Component, OnInit } from '@angular/core';
import { ApiService, SettingsService } from '../../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
@Component({
  selector: 'app-profit-center',
  templateUrl: './profit-center.component.html',
  styleUrls: ['./profit-center.component.less'],
  providers: [ApiService]
})
export class ProfitCenterComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  records = 10;
  constructor(private _service: ApiService, private _route: Router) { }
  ngOnInit() {
    this.getList();

    // clasiffication edit
    $(document).on('click', '.addLeaf', function () {
      var count = $(this).closest('li').siblings('li').length;
      if (count <= 3) {
        var inputs = $(this).parent('div').clone();
        inputs = $(inputs).add($(this).parent('div').nextUntil('.col-sm-2').clone());
        $(this).closest('li').after('<li class="row ml-0 mr-0" />');
        $(this).closest('li').next('li').append(inputs);
        $(this).closest('li').next('li').find('.addChild, .addLeaf').hide();
      }
      else {
        alert('Max limit 5');
      }
    });
    $(document).on('click', '.addChild', function () {
      var inputs = $(this).parent('div').clone();
      //var inputs_sibl = $(this).parent('div').siblings().clone();
      //console.log(inputs_sibl);
      inputs = $(inputs).add($(this).parent('div').nextUntil('.col-sm-2').clone());
      // inputs  = inputs + inputs_sibl;

      var childEle = $(this).closest('li').find('ul.child');

      if (childEle.length > 0) {

        childEle.append('<li class="row ml-0 mr-0"></li>');

        childEle.find('li').last().append(inputs);

      }

      else {

        $(this).closest('li').append('<ul class="child"><li class="row ml-0 mr-0"></li></ul>');

        $(this).closest('li').find('ul.child li').append(inputs);


      }


    });

    $(document).on('click', '.delete', function () {
      $(this).closest('li').remove();
    });
  }

  getList() {
    let request = { "status": "1" }
    this._service.PostService(request, '/finance/getProfitCentres')
      .subscribe(
      data => {
        this.List = data.profitCentreTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        setTimeout(() => {
          jQuery('.addicon').click(function (d) {
            // debugger;
            console.log("fdgdfg");
            d.stopPropagation();
            jQuery(this).parents('header').siblings('ul').toggle();
            jQuery(this).toggleClass('active');

          });
        }, 500);


      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  selectedRecords(code, e) {
    e.stopPropagation();
    code.checked = !code.checked;
    if (code.checked) {
      this.selectedlist.push(code);
    } else {
      var index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1)
    }
  }
}
