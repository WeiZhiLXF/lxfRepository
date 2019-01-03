import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { AssetInformation } from '../InformationPage/AssetInformation';
import { SearchTree } from '../InformationPage/SearchTree';
import { CategoryManage } from '../InformationPage/CategoryManage';
import { SupplierPage } from '../InformationPage/SupplierPage';
import { AssetInformation3DScene } from '../InformationPage/AssetInformation3DScene';



/**
 * 内容面板
 */
export class ContentPanel extends React.Component {

   /**渲染*/
   render() {
      return (
         <div >
            <Switch>
               <Route exact path='/AssetInformation' component={AssetInformation} />
               <Route exact path='/DepartmentInformation' component={SearchTree} />
               <Route exact path='/AssetCategory' component={CategoryManage} />
               <Route exact path='/AssetSupplier' component={SupplierPage} />
               <Route exact path='/AssetInformation/AssetInformation3DScene' component={AssetInformation3DScene} />
               {/*<Route exact path='/system/hobbing' component={HobbingConfigPage} />
               <Route exact path='/material/edge' component={EdgePage} />
               <Route exact path='/material/substrate' component={MaterialPage} />
               <Route exact path='/material/surface' component={TexturePage} />
               <Route exact path='/rule/hardware' component={HardwareRulePage} />
               <Route exact path='/rule/handle' component={HandleRulePage} />
               <Route exact path='/rule/edge' component={EdgeRulePage} />
               <Route exact path='/component/door' component={DoorPage} />
               <Route exact path='/component/hardware' component={withRouter(HardwarePage)} />
               <Route exact path='/component/hardware/hardwareeditor' component={withRouter(HardwarePage)} />
               <Route exact path='/component/plank' component={withRouter(PlankPage)} />
               <Route exact path='/component/assembly' component={withRouter(AssemblyPage)} />
               <Route exact path='/component/plate' component={withRouter(ComponentPlatePage)} />
               <Route exact path='/rule/mill' component={PreMillingRulePage} />
               <Route exact path='/component/chest' component={withRouter(ChestPage)} /> */} */}
            </Switch>
         </ div>

      )
   }
}