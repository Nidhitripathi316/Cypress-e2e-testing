describe("first test",()=>{
it("first test",()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    //by tag name
    cy.get('input')

    //by id
    cy.get('#inputEmail1')

    //by class name
    cy.get('.input-full-width')

    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by attribut name
    cy.get('[placeholder]')

    //by attribute value and name
    cy.get('[placeholder="Email"]')
    // by tag name and attribute with value
    cy.get('input[placeholder="Email"]')
    //by two different attribute
    cy.get('[placeholder="Email"][fullwidth]')
}
)
it('second test',()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.contains('Sign in')
    cy.contains('[status="warning"]','Sign in')
    cy.get('#inputEmail3').parents('form').find('button').should('contain', "Sign in").parents('form').find('nb-checkbox').click()

    cy.contains("nb-card","Horizontal form").find('[type="email"]')
})
it('then and wrap methods',()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain',"Email")
    // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain',"Password")
    // cy.contains('nb-card','Basic form').find('[ for="exampleInputEmail1"]').should('contain',"Email address")
    // cy.contains('nb-card','Basic form').find('[ for="exampleInputPassword1"]').should('contain',"Password")

    //another apporach
    cy.contains('nb-card','Using the Grid').then( firstForm => {
        const emailLabelForm=firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelForm=firstForm.find('[for="inputPassword2"]').text()
        expect(emailLabelForm).to.equal('Email')
        expect(passwordLabelForm).to.equal('Password')
        cy.wrap(firstForm).find('[ for="inputEmail1"]').should('contain','Email')
    })
    cy.contains('nb-card','Basic form').then(secondForm =>{
            const emailLabelForm=secondForm.find('[ for="exampleInputEmail1"]').text()
            const passwordLabelForm=secondForm.find('[ for="exampleInputPassword1"]').text()
            expect(emailLabelForm).to.equal('Email address')
            expect(passwordLabelForm).to.equal('Password')
            
 })
})
it('invoke command',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //1
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then(inputLabel=>{
            expect(inputLabel.text()).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text=>{
            expect(text).to.equal('Email address')
        })
        cy.contains('nb-card','Basic form')
        .find('nb-checkbox').click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        .should('contain','checked')
        
})
it('datepicker',()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click({force:true})
    cy.contains('nb-card','Common Datepicker').find('input').then(input=>{
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop','value').should('contain', 'May 17, 2021')
    })
})
it('radio buttons',()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButton=>{
        cy.wrap(radioButton).first().check({force:true})
        .should('be.checked')
        cy.wrap(radioButton).eq(1).check({force:true})

        cy.wrap(radioButton).first()
        .should('not.be.checked')
        cy.wrap(radioButton).eq(2)
        .should('be.disabled')
    })
})
it('check box',()=>{
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]').check({force:true})
    cy.get('[type="checkbox"]').eq(0).click({force:true})
    cy.get('[type="checkbox"]').eq(1).check({force:true})
})
it('lsit and dropdown',()=>{
    cy.visit('/')
    
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain','Dark')
    // cy.get('nb-layout-header nav ').should('have.css', 'background-color','rgb(34,43,69)')

    cy.get('nav nb-select').then( dropdown=>{
        cy.wrap(dropdown).click()
        cy.get('.options-list nb-option').each((listItems , index)=>{
            const itemText=listItems.text().trim()
            const colors={
                "Light":"rgb(255,255,255)",
                "Dark":"rgb(34,43,69)",
                "Cosmic":"rgb(50,50,89)",
                "Corporate":"rgb(255,255,255)"
            }
            cy.wrap(listItems).click()
            cy.wrap(dropdown).should('contains','itemText')
            cy.get('nb-layout-header nav ').should('have.css', 'background-color',colors[itemText])
            if(index<=3){
                cy.wrap(dropdown).click()
            }
            
        })
    })
    
})
it('web tables',()=>{
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
//1
    cy.get('tbody').contains('tr','Larry').then( tableRow=>{
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).should('contain','25')
    })
    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow=>{
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Nidhi")
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Tripathi")
        cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().find('td').then(tableColumns=>{
        cy.wrap(tableColumns).eq(2).should('contain','Nidhi')
        cy.wrap(tableColumns).eq(3).should('contain','Tripathi')

        })
        //3
        const age=[20,30,40,200]
        cy.wrap(age).each( age=>{
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age==200){
                   cy.wrap(tableRow).should('contain','No data found')
                }
                else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain',age)
                }
                
            })
        })
        
})

it('tooltip',()=>{
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()
    cy.contains('nb-card','Colored Tooltips')
    .contains('Default').click()
    cy.get('nb-tooltip').should('contain','This is a tooltip')
})
it.only('dialogbox',()=>{
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    //1
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm',(confirm)=>{
        expect(confirm).to.equal('Are you sure you want to delete?')
    })
     //2
     const stub= cy.stub()
     cy.on('window:confirm',stub)
     cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
         expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
     })
      //3
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm',(confirm)=>false)
})

})