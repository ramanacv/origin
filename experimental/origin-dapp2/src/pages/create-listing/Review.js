import React, { Component } from 'react'

import Redirect from 'components/Redirect'
import Link from 'components/Link'
import Wallet from 'components/Wallet'
import Price from 'components/Price'
import CoinPrice from 'components/CoinPrice'

import CreateListing from './mutations/CreateListing'
import UpdateListing from './mutations/UpdateListing'

import Categories from './_categories'

function category(listing) {
  const cat = Categories.lookup[listing.category] || listing.category
  const subCat = Categories.lookup[listing.subCategory] || listing.subCategory
  return `${cat} / ${subCat}`
}

class Review extends Component {
  state = {}
  render() {
    const isEdit = this.props.mode === 'edit'
    const prefix = isEdit ? `/listings/${this.props.listingId}/edit` : '/create'

    const { listing } = this.props
    if (!listing.subCategory) {
      return <Redirect to={`${prefix}/step-1`} />
    } else if (!listing.title) {
      return <Redirect to={`${prefix}/step-2`} />
    }

    const boost =
      this.props.tokenBalance >= Number(listing.boost) ? listing.boost : '0'

    return (
      <div className="row create-listing-review">
        <div className="col-md-8">
          <h2>Review your listing</h2>

          <div className="detail">
            <div className="row">
              <div className="col-3 label">Title</div>
              <div className="col-9">{listing.title}</div>
            </div>
            <div className="row">
              <div className="col-3 label">Cagegory</div>
              <div className="col-9">{category(listing)}</div>
            </div>
            <div className="row">
              <div className="col-3 label">Description</div>
              <div className="col-9">{listing.description}</div>
            </div>
            <div className="row">
              <div className="col-3 label">Listing Price</div>
              <div className="col-9">
                <CoinPrice price={listing.price} coin="eth" />
                <div className="fiat">
                  ~ <Price amount={listing.price} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3 label">Boost Level</div>
              <div className="col-9">
                <CoinPrice price={boost} coin="ogn" />
              </div>
            </div>
            <div className="row mb-0">
              <div className="col-3 label">Photos</div>
              <div className="col-9">
                {listing.media.length ? (
                  <div className="photos">
                    {listing.media.map((image, idx) => (
                      <div
                        key={idx}
                        className="photo-row"
                        style={{ backgroundImage: `url(${image.urlExpanded})` }}
                      />
                    ))}
                  </div>
                ) : (
                  <i>No Photos</i>
                )}
              </div>
            </div>
          </div>

          <div className="actions">
            <Link className="btn btn-outline-primary" to={`${prefix}/step-3`}>
              Back
            </Link>
            {isEdit ? (
              <UpdateListing
                listing={this.props.listing}
                listingId={this.props.listingId}
                tokenBalance={this.props.tokenBalance}
                className="btn btn-primary"
                children="Done"
              />
            ) : (
              <CreateListing
                listing={this.props.listing}
                tokenBalance={this.props.tokenBalance}
                className="btn btn-primary"
                children="Done"
              />
            )}
          </div>
        </div>
        <div className="col-md-4">
          <Wallet />
          <div className="gray-box">
            <h5>What happens next?</h5>
            When you submit this listing, you will be asked to confirm your
            transaction in MetaMask. Buyers will then be able to see your
            listing and make offers on it.
          </div>
        </div>
      </div>
    )
  }
}

export default Review

require('react-styl')(`
  .create-listing .create-listing-review
    .fiat
      display: inline-block
      margin-left: 0.75rem
      font-size: 14px
    h2
      font-size: 28px
    .detail
      border: 1px solid var(--light)
      border-radius: 5px
      padding: 1rem 2rem
      font-size: 18px
      font-weight: normal
      .row
        margin-bottom: 1rem
        .label
          color: var(--dusk)
    .photos
      margin-bottom: 1rem
      display: grid
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      grid-template-columns: repeat(auto-fill,minmax(90px, 1fr));
      .photo-row
        font-size: 12px
        box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0), inset 0 0 0 1px rgba(16, 22, 26, 0.15), inset 0 1px 1px rgba(16, 22, 26, 0.2);
        background: #fff
        padding: 5px;
        background-position: center
        width: 100%
        height: 80px
        background-size: contain
        background-repeat: no-repeat

    .actions
      margin-top: 2.5rem
      display: flex
      justify-content: space-between
      .btn
        min-width: 10rem
        border-radius: 2rem
        padding: 0.625rem
        font-size: 18px
`)
