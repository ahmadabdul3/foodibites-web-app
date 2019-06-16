import React, { Component, PureComponent } from 'react';
import FormInput from 'src/frontend/components/form_input';
import http from 'src/frontend/services/http';
import { Redirect } from 'react-router';
import appRoutes from 'src/constants/routes';
import { identifier } from 'babel-types';

function getProductModel({ values = {} }) {
  return {
    ingredient: values.ingredient || '',
    name: values.name || '',
    brand: values.brand || '',
    barcodeValue: values.barcodeValue || '',
    ingredients: values.ingredients || [],
    servingSize: values.servingSize || '',
    servingsPerContainer: values.servingsPerContainer || '',
    calories: values.calories || '',
    totalFat: values.totalFat || '',
    saturatedFat: values.saturatedFat || '',
    transFat: values.transFat || '',
    cholesterol: values.cholesterol || '',
    sodium: values.sodium || '',
    totalCarbs: values.totalCarbs || '',
    dietaryFiber: values.dietaryFiber || '',
    totalSugars: values.totalSugars || '',
    addedSugars: values.addedSugars || '',
    protein: values.protein || '',
    vitaminA: values.vitaminA || '',
    vitaminC: values.vitaminC || '',
    calcium: values.calcium || '',
    iron: values.iron || '',
  };
}

export default class AddProductForm extends PureComponent {
  state = {
    ingredient: '',
    ...getProductModel({}),
    ingredients: {},
    completed: false,
    redirectTo: '',
  };

  onChange = ({ name, value }) => {
    this.setState({ [name]: value });
  }

  addIngredient = ({ name, value }) => {
    const commaExists = value.includes(',');
    if (!commaExists) this.setState({ ingredient: value });
    else {
      const { parts, readyForAdding } = getIngredientParts(value);
      console.log('parts', parts);
      console.log('rfa', readyForAdding);
      if (!readyForAdding) {
        this.setState({ ingredient: value });
        return;
      };
      const joined = parts.reduce((all, part) => {
        const sanitized = sanitizeIngredient(part);
        if (!sanitized) return all;
        all[sanitized] = { name: sanitized };
        return all;
      }, {});

      this.setState({
        ingredient: '',
        ingredients: {
          ...this.state.ingredients,
          ...joined,
        },
      });
    }
  }

  cancelAdd = () => {
    this.setState({ redirectTo: appRoutes.home });
  }

  addProduct = (e) => {
    // e.preventDefault();
    const ingredients = Object.keys(this.state.ingredients).map(k => {
      return this.state.ingredients[k];
    });
    http.post('/product', { product: { ...this.state, ingredients }}).then(r => {
      console.log('result', r);
      this.setState({ redirectTo: appRoutes.home });
    }).catch(e => {
      console.log('error', e);
    });
  }

  updateCompletedStatus = () => {
    if(this.state.completed == false) {
      this.setState({ completed: true });
    } else {
      this.setState({ completed: false });
    }
  }

  render() {
    const { error, redirectTo } = this.state;
    if (redirectTo) return <Redirect push to={redirectTo} />;
    console.log("this.state.completed: ", this.state.completed);
    return (
      <div className='product-new-page'>
        <header>
          <div className='content'>
            <div className='product-status'>
              <label className='product-status__label'>
                Product Completed:
              </label>
              <input
                name='completed'
                type='checkbox'
                checked={ this.state.completed }
                onChange={ this.updateCompletedStatus }
              />
            </div>
            <button className='button' onClick={this.cancelAdd}>
              Cancel
            </button>
            <button className='green-button' onClick={this.addProduct}>
              Save Product
            </button>
          </div>
        </header>
        <section className='product-new-page__body'>
          <h2 className='page-title'>
            Add a new product
          </h2>
          <div className='add-product-form'>
            <div className='add-product-form__row'>
              <div className='add-product-form__base-info'>
                <h3 className='form-title'>
                  Base Info
                </h3>
                <FormInput
                  labelText='Name'
                  name='name'
                  onChange={this.onChange}
                  value={this.state.name}
                />
                <FormInput
                  labelText='Brand'
                  name='brand'
                  onChange={this.onChange}
                  value={this.state.brand}
                />
                <FormInput
                  labelText='Barcode Number'
                  name='barcodeValue'
                  onChange={this.onChange}
                  value={this.state.barcodeValue}
                />
              </div>
              <div className='add-product-form__ingredients'>
                <h3 className='form-title'>
                  Ingredients
                </h3>
                <FormInput
                  labelText='Separate ingredients with a comma'
                  name='ingredient'
                  value={this.state.ingredient}
                  onChange={this.addIngredient}
                />
                <div className='ingredient-list'>
                  {
                    Object.keys(this.state.ingredients).map((k, i) => (
                      <div key={k + i} className='ingredient'>
                        {this.state.ingredients[k].name}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className='add-product-form__nutrition-facts'>
              <h3 className='form-title'>
                Nutrition Facts
              </h3>
              <FormColumnContainer>
                <FormColumn title='Serving Info'>
                  <FormInput
                    labelText='Serving Size'
                    name='servingSize'
                    value={this.state.servingSize}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Servings Per Container'
                    name='servingsPerContainer'
                    value={this.state.servingsPerContainer}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Calories'
                    name='calories'
                    value={this.state.calories}
                    onChange={this.onChange}
                  />
                </FormColumn>
                <FormColumn title='Fats'>
                  <FormInput
                    labelText='Total Fat'
                    name='totalFat'
                    value={this.state.totalFat}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Saturated Fat'
                    name='saturatedFat'
                    value={this.state.saturatedFat}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Trans Fat'
                    name='transFat'
                    value={this.state.transFat}
                    onChange={this.onChange}
                  />
                </FormColumn>
                <FormColumn title='Cholesterol & Sodium'>
                  <FormInput
                    labelText='Cholesterol'
                    name='cholesterol'
                    value={this.state.cholesterol}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Sodium'
                    name='sodium'
                    value={this.state.sodium}
                    onChange={this.onChange}
                  />
                </FormColumn>
              </FormColumnContainer>
              <FormColumnContainer>
                <FormColumn title='Carbs'>
                  <FormInput
                    labelText='Total Carbs'
                    name='totalCarbs'
                    value={this.state.totalCarbs}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Dietary Fiber'
                    name='dietaryFiber'
                    value={this.state.dietaryFiber}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Total Sugars'
                    name='totalSugars'
                    value={this.state.totalSugars}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Added Sugars'
                    name='addedSugars'
                    value={this.state.addedSugars}
                    onChange={this.onChange}
                  />
                </FormColumn>
                <FormColumn title='Protein'>
                  <FormInput
                    labelText='Protein'
                    name='protein'
                    value={this.state.protein}
                    onChange={this.onChange}
                  />
                </FormColumn>
                <FormColumn title='Vitamins & Minerals'>
                  <FormInput
                    labelText='Vitamin A'
                    name='vitaminA'
                    value={this.state.vitaminA}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Vitamin C'
                    name='vitaminC'
                    value={this.state.vitaminC}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Calcium'
                    name='calcium'
                    value={this.state.calcium}
                    onChange={this.onChange}
                  />
                  <FormInput
                    labelText='Iron'
                    name='iron'
                    value={this.state.iron}
                    onChange={this.onChange}
                  />
                </FormColumn>
              </FormColumnContainer>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

class FormColumnContainer extends PureComponent {
  render() {
    return (
      <div className='form-columns'>
        { this.props.children }
      </div>
    );
  }
}

class FormColumn extends PureComponent {
  render() {
    return (
      <div className='form-column'>
        <FormColumnTitle text={this.props.title} />
        { this.props.children }
      </div>
    );
  }
}

class FormColumnTitle extends PureComponent {
  render() {
    if (!this.props.text) return null;
    return (
      <h4 className='form-column__title'>
        { this.props.text }
      </h4>
    );
  }
}

function sanitizeIngredient(ingredient) {
  let sanitized = ingredient.trim();
  const lastIndex = sanitized.length - 1;
  if (sanitized[lastIndex] === '.') sanitized = sanitized.slice(0, -1);
  return sanitized;
}

function getIngredientParts(ingredients) {
  const seperator = ',';
  const exceptions = {
    '(': true,
    '[': true,
  };
  const exceptionClosers = {
    ')': '(',
    ']': '[',
  };
  const exceptionsEncountered = [];
  const parts = [];
  let part = '';

  for (let i = 0; i < ingredients.length; i++) {
    const character = ingredients[i];
    if (!part && character === ',') continue;
    else if (exceptions[character]) {
      const exception = { character };
      exceptionsEncountered.push(exception);
      part += character;
    } else if (exceptionClosers[character]) {
      const exceptionCloser = exceptionClosers[character];
      const lastExceptionIndex = exceptionsEncountered.length - 1;
      const lastException = exceptionsEncountered[lastExceptionIndex];
      if (lastException.character === exceptionCloser) {
        exceptionsEncountered.pop();
      }
      part += character;
    } else if (character === ',') {
      if (exceptionsEncountered.length > 0) part += character;
      else {
        parts.push(part);
        part = '';
      }
    } else {
      part += character;
    }

    if (i === ingredients.length - 1) parts.push(part);
  }

  if (exceptionsEncountered.length > 0) return { parts, readyForAdding: false };
  return { parts, readyForAdding: true };
}
