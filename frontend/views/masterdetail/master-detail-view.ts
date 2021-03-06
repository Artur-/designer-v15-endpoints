import {customElement, html, LitElement, query, unsafeCSS} from 'lit-element';
import { render } from 'lit-html';

import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';

// import the remote endpoint
import * as viewEndpoint from '../../generated/MasterDetailEndpoint';

// import types used in the endpoint
import Employee from '../../generated/com/example/application/backend/Employee';

import {VaadinConnectError} from '@vaadin/flow-frontend/Connect';

// utilities to import style modules
import { CSSModule } from '../../css-utils';

// @ts-ignore
import styles from './master-detail-view.css';

@customElement('master-detail-view')
export class MasterDetailViewElement extends LitElement {
  static get styles() {
    return [
      CSSModule('lumo-typography'),
      unsafeCSS(styles)
    ];
  }

  @query('#grid')
  private grid: any;

  @query('#notification')
  private notification: any;

  @query('#firstName') private firstName: any;
  @query('#lastName') private lastName: any;
  @query('#email') private email: any;
  @query('#password') private password: any;

  render() {
    return html`
      <vaadin-split-layout class="splitLayout">
        <div class="splitLayout__gridTable">
          <vaadin-grid id="grid" class="splitLayout" theme="no-border">
            <vaadin-grid-column .renderer=${this.firstNameRenderer}>
              <template class="header">
                First name
              </template>
            </vaadin-grid-column>
            <vaadin-grid-column .renderer=${this.lastNameRenderer}>
              <template class="header">
                Last name
              </template>
            </vaadin-grid-column>
            <vaadin-grid-column .renderer=${this.emailRenderer}>
              <template class="header">
                Email
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>
        <div id="editor-layout">
          <vaadin-form-layout>
            <vaadin-form-item>
              <label slot="label">First name</label>
              <vaadin-text-field
                class="full-width"
                id="firstName"
              ></vaadin-text-field>
            </vaadin-form-item>
            <vaadin-form-item>
              <label slot="label">Last name</label>
              <vaadin-text-field
                class="full-width"
                id="lastName"
              ></vaadin-text-field>
            </vaadin-form-item>
            <vaadin-form-item>
              <label slot="label">Email</label>
              <vaadin-text-field
                class="full-width"
                id="email"
              ></vaadin-text-field>
            </vaadin-form-item>
            <vaadin-form-item>
              <label slot="label">Password</label>
              <vaadin-password-field
                class="full-width"
                id="password"
              ></vaadin-password-field>
            </vaadin-form-item>
          </vaadin-form-layout>
          <vaadin-horizontal-layout
            id="button-layout"
            theme="spacing"
          >
            <vaadin-button theme="tertiary" slot="" @click="${this.clearForm}">
              Cancel
            </vaadin-button>
            <vaadin-button theme="primary"  @click="${this.save}">
              Save
            </vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
      <vaadin-notification duration="5000" id="notification">
      </vaadin-notification>
    `;
  }

  // Wait until all elements in the template are ready to set their properties
  async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    // Retrieve data from the server-side endpoint.
    const persons = await viewEndpoint.getEmployees();
    this.grid.items = persons;
    this.grid.addEventListener('active-item-changed',
     function(this: any, event: any) {
      const item = event.detail.value;
      this.selectedItems = item ? [item] : [];
      const customView = this.domHost;

      if (item) {
        customView.firstName.value = item.firstname;
        customView.lastName.value = item.lastname;
        customView.email.value = item.email;
        customView.password.value = '----';
      } else {
        customView.clearForm();
      }
    });
  }

  private async save() {
    const employee: Employee = {
      email: this.email.value,
      firstname: this.firstName.value,
      lastname: this.lastName.value,
      notes: '',
      title: ''
    };
    try {
      await viewEndpoint.saveEmployee(employee);
    } catch (error) {
      if (error instanceof VaadinConnectError) {
        this.notification.renderer = (root: Element) =>
        root.textContent = `Server error. ${error.message}`;
        this.notification.open();
      } else {
        throw error;
      }
    }
  }

  private clearForm() {
    this.grid.selectedItems = [];
    this.firstName.value =  '';
    this.lastName.value =  '';
    this.email.value = '';
    this.password.value = '';
  }

  private firstNameRenderer(root: Element, _: any, rowData: {item: Employee}) {
    render(
      html`
        <span>${rowData.item.firstname}</span>
      `,
      root
    );
  }

  private lastNameRenderer(root: Element, _: any, rowData: {item: Employee}) {
    render(
      html`
        <span>${rowData.item.lastname}</span>
      `,
      root
    );
  }

  private emailRenderer(root: Element, _: any, rowData: {item: Employee}) {
    render(
      html`
        <span>${rowData.item.email}</span>
      `,
      root
    );
  }
}
