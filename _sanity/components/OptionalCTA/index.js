import React from 'react'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import FormField from 'part:@sanity/components/formfields/default'
import { FormBuilderInput } from 'part:@sanity/form-builder'
import {
  PatchEvent,
  set,
  setIfMissing,
  unset
} from 'part:@sanity/form-builder/patch-event'
import { AddIcon, TrashIcon } from '@sanity/icons'
import { Button } from '@sanity/ui'
import styles from './styles.css'

const OptionalCTA = React.forwardRef((props, ref) => {
  const { markers, onChange, type, value } = props

  const handleAdd = () => {
    onChange(PatchEvent.from(set({ _type: 'cta', icon: 'none' })))
  }

  const handleRemove = () => {
    onChange(PatchEvent.from(unset()))
  }

  const handleFieldChange = (field, fieldPatchEvent) => {
    // Whenever the field input emits a patch event, we need to make sure
    // each of the included patches are prefixed with its field name and ensure this input's value exists
    // e.g. going from: {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    onChange(
      fieldPatchEvent
        .prefixAll(field.name)
        .prepend(setIfMissing({ _type: type.name }))
    )
  }

  return (
    <FormField
      label={type.title}
      description={type.description}
      markers={markers}
    >
      <Fieldset className={styles.fieldset}>
        {value &&
          type.fields.map(field => (
            <FormBuilderInput
              key={field.name}
              markers={markers}
              onChange={patchEvent => handleFieldChange(field, patchEvent)}
              path={[field.name]}
              type={field.type}
              value={value[field.name]}
            />
          ))}
        {value ? (
          <Button
            icon={TrashIcon}
            onClick={handleRemove}
            text="Remove CTA"
            tone="critical"
          />
        ) : (
          <Button
            icon={AddIcon}
            mode="ghost"
            onClick={handleAdd}
            text="Add CTA"
          />
        )}
      </Fieldset>
    </FormField>
  )
})

export default OptionalCTA
