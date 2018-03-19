import { parameters } from './parameterDetails'

export const constructClientParameterDetails = p => {
  let title
  let value

  if (p.title === parameters[0].title) {
    value = p.value / 86400 + ' days'
    title = parameters[0].clientTitle
  }

  if (p.title === parameters[1].title) {
    value = p.value + '%'
    title = parameters[1].clientTitle
  }

  if (p.title === parameters[2].title) {
    value = p.value + '%'
    title = parameters[2].clientTitle
  }

  if (p.title === parameters[3].title) {
    value = p.value + ' DID'
    title = parameters[3].clientTitle
  }

  if (p.title === parameters[4].title) {
    value = p.value + ' DID'
    title = parameters[4].clientTitle
  }

  if (p.title === parameters[5].title) {
    value = p.value + ' DID'
    title = parameters[5].clientTitle
  }

  if (p.title === parameters[6].title) {
    value = p.value + ' DID'
    title = parameters[6].clientTitle
  }

  if (p.title === parameters[7].title) {
    value = p.value + ' voters'
    title = parameters[7].clientTitle
  }

  if (p.title === parameters[8].title) {
    value = p.value + ' DID'
    title = parameters[8].clientTitle
  }

  if (p.title === parameters[9].title) {
    value = p.value + ' DID'
    title = parameters[9].clientTitle
  }
  if (p.title === parameters[10].title) {
    value = p.value + '%'
    title = parameters[10].clientTitle
  }

  return {
    value,
    title
  }
}
