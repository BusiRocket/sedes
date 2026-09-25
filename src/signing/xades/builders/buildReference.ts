import type { BuiltReference } from '../types/BuiltReference'
import type { ReferenceSpec } from '../types/ReferenceSpec'
import { xadesUris } from '../xadesUris'
import { buildDigestElements } from './buildDigestElements'
import { buildElement } from './buildElement'
import { buildText } from './buildText'

/** A SHA-256 ds:Reference with an empty DigestValue to fill once the tree is final. */
export const buildReference = (
  ds: string,
  spec: ReferenceSpec,
): BuiltReference => {
  const digest = buildText('')
  const transforms =
    spec.transforms.length === 0
      ? []
      : [
          buildElement(
            `${ds}:Transforms`,
            {},
            spec.transforms.map((algorithm) =>
              buildElement(`${ds}:Transform`, { Algorithm: algorithm }),
            ),
          ),
        ]
  const element = buildElement(
    `${ds}:Reference`,
    {
      ...(spec.id === undefined ? {} : { Id: spec.id }),
      ...(spec.type === undefined ? {} : { Type: spec.type }),
      URI: spec.uri,
    },
    [...transforms, ...buildDigestElements(ds, xadesUris.sha256, digest)],
  )
  return { element, pending: { target: spec.target, digest } }
}
