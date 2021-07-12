function selectGroupMenuName(groupName){
    cy.contains('a',groupName).then( menu =>{
        cy.wrap(menu).find('.expand-state g g ').invoke('attr','data-name').then(attr=>{
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}
export class NavigationPage{
      formLayoutsPage(){
        //cy.contains('Forms').click()
        selectGroupMenuName('Form')
        cy.contains('Form Layouts').click()
      }
      datapickerPage(){
        //cy.contains('Forms').click()
        selectGroupMenuName('Form')
        cy.contains('Datepicker').click()
      }
      modalAndOverlaysPage(){
        selectGroupMenuName('Modal & Overlays')
        cy.contains('Toastr').click()
      }
    
     smartTablePage(){
        selectGroupMenuName('Tables & Data')
        cy.contains('Smart Table').click()
      }
      tooltipPage(){
        selectGroupMenuName('Modal & Overlays')
        cy.contains('Tooltip').click()
      }
     
}
export const navigateTo = new NavigationPage()