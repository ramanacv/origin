import React, { Component } from 'react'
import pick from 'lodash/pick'

import Steps from 'components/Steps'
import Redirect from 'components/Redirect'
import Wallet from 'components/Wallet'

import Categories from './_categories'
import { formInput, formFeedback } from 'utils/formHelpers'

class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props.listing, fields: Object.keys(props.listing) }
  }

  render() {
    const isEdit = this.props.mode === 'edit'
    if (this.state.valid) {
      if (isEdit) {
        return (
          <Redirect to={`/listings/${this.props.listingId}/edit/step-2`} push />
        )
      } else {
        return <Redirect to="/create/step-2" push />
      }
    }

    const input = formInput(this.state, state => this.setState(state))
    const Feedback = formFeedback(this.state)

    const Category = (id, title) => {
      const active = this.state.category === id
      const cls = id.split('.')[1]
      return (
        <div
          key={id}
          className={`category ${cls} ${active ? 'active' : 'inactive'}`}
          onClick={() => this.setState({ category: id, subCategory: '' })}
        >
          <div className="title">{title}</div>
          {!active ? null : (
            <div className="sub-cat">
              <select {...input('subCategory')}>
                <option value="">Select</option>
                {Categories[id].map(([id, title]) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
              </select>
              {Feedback('subCategory')}
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-md-8">
          <div className="create-listing-step-1">
            {isEdit ? (
              <h2>Let’s update your listing</h2>
            ) : (
              <h2>Hi there! Let’s get started creating your listing</h2>
            )}
            <div className="wrap">
              <div className="step">Step 1</div>
              <div className="step-description">
                {isEdit
                  ? `Update listing type`
                  : `What type of listing do you want to create?`}
              </div>
              <Steps steps={3} step={1} />
              <form
                onSubmit={e => {
                  e.preventDefault()
                  this.validate()
                }}
              >
                {Categories.root.map(([schema, title]) =>
                  Category(schema, title)
                )}
                <div className="actions">
                  <button
                    type="submit"
                    className={`btn btn-primary${
                      this.state.subCategory ? '' : ' disabled'
                    }`}
                    children="Continue"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <Wallet />
        </div>
      </div>
    )
  }

  validate() {
    const newState = {}

    if (!this.state.subCategory) {
      newState.subCategoryError = 'Category is required'
    }

    newState.valid = Object.keys(newState).every(f => f.indexOf('Error') < 0)

    if (!newState.valid) {
      window.scrollTo(0, 0)
    } else if (this.props.onChange) {
      this.props.onChange(pick(this.state, this.state.fields))
    }
    this.setState(newState)
    return newState.valid
  }
}

export default Step1

require('react-styl')(`
  .create-listing-step-1
    max-width: 570px
    > .wrap
      max-width: 460px
    h2
      font-family: Poppins;
      font-size: 40px;
      font-weight: 200;
    .category
      border: 1px solid var(--light)
      font-size: 24px
      font-weight: normal
      color: var(--dark)
      margin-bottom: 0.75rem
      border-radius: 5px;
      &.inactive
        cursor: pointer
      &.inactive:hover
        background-color: var(--pale-grey-eight)
      &.active
        color: var(--dark)
        border-color: #000
      .title
        display: flex
        align-items: center
        margin: 0.5rem 0
        &::before
          content: ""
          background-repeat: no-repeat
          background-size: contain
          background-position: center
          width: 8rem
          height: 5rem

      &.forSale .title::before
        background-image: url(images/create-listing/for-sale.svg)
        background-position: 1rem
      &.forRent .title::before
        background-image: url(images/create-listing/for-rent.svg)
        background-position: 1.9rem
      &.services .title::before
        background-image: url(images/create-listing/services.svg)
        background-position: 2rem
      &.announcements .title::before
        background-image: url(images/create-listing/annoucements.svg)
        background-position: 1rem
        background-size: 4rem

      .sub-cat
        padding: 0.5rem 1rem 1rem 1rem

    .actions
      margin-top: 2rem
      display: flex;
      justify-content: flex-end;
      .btn
        min-width: 10rem
        border-radius: 2rem
        padding: 0.625rem
        font-size: 18px

`)
