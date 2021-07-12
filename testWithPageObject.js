import { onDatePickerPage } from '../support/page_objects/datepickerPage'
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage'
import {navigateTo} from '../support/page_objects/navigationPage'
import { onSmartTablePage } from '../support/page_objects/smartTablePage'
describe('test with page object',()=>{
     
      beforeEach('open application',()=>{
       cy.openHomePage()
      })
      
      it('verify navigation across each pages',()=>{
        navigateTo.formLayoutsPage()
        navigateTo.datapickerPage()
        navigateTo.modalAndOverlaysPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        
      })
      it.only('should submit lnline and basic form and select tomorrows day',()=>{
          navigateTo.formLayoutsPage()
          onFormLayoutsPage.submitInineFormWithNameAndEmail('Nidhi','test@test.com')
          // onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com','password')
          navigateTo.datapickerPage()
          // onDatePickerPage.selectCommonDatePickerDayFromToday(1)
          // onDatePickerPage.selectDatePickerWithRangeFromToday(7,14)
          navigateTo.smartTablePage()
          onSmartTablePage.addNewRecordWithFirstNameAndLastName('Nidhi','Tripathi')
          onSmartTablePage.updateAgeByFirstName('Nidhi','35')
          onSmartTablePage.deleteRowByIndex(1)

      })

})