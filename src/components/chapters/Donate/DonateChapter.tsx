import { useEffect, useState, type FormEvent } from 'react'
import { BRANDING, CONTACT } from '../../../config'
import { ChapterOverlay } from '../../ui'
import type { ChapterProps } from '../types'
import './DonateChapter.css'

const PRESET_AMOUNTS = [20, 50, 100, 250]
const MIN_AMOUNT_RON = 5
const MAX_AMOUNT_RON = 50_000

const PAYMENT_LINK: string | undefined = import.meta.env.VITE_STRIPE_PAYMENT_LINK

const getInitialReturned = (): boolean =>
  new URLSearchParams(window.location.search).get('donation') === 'success'

const buildCheckoutUrl = (paymentLink: string | undefined, amountRon: number): string | null => {
  if (!paymentLink) return null
  try {
    const url = new URL(paymentLink)
    url.searchParams.set('__prefilled_amount', String(Math.round(amountRon * 100)))
    return url.toString()
  } catch {
    return null
  }
}

export const DonateChapter = ({ scene, visible }: ChapterProps) => {
  const [returned, setReturned] = useState(getInitialReturned)
  const [amount, setAmount] = useState<number>(PRESET_AMOUNTS[1])
  const [customAmount, setCustomAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onPageShow = () => setSubmitting(false)
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  const effectiveAmount = customAmount ? Math.round(Number(customAmount) * 100) / 100 : amount
  const amountIsValid =
    Number.isFinite(effectiveAmount) &&
    effectiveAmount >= MIN_AMOUNT_RON &&
    effectiveAmount <= MAX_AMOUNT_RON

  const dismissReturn = () => {
    window.history.replaceState(null, '', window.location.pathname)
    setReturned(false)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!amountIsValid) {
      setError(`Introdu o sumă între ${MIN_AMOUNT_RON} și ${MAX_AMOUNT_RON} RON.`)
      return
    }

    const checkoutUrl = buildCheckoutUrl(PAYMENT_LINK, effectiveAmount)
    if (!checkoutUrl) {
      setError('Donațiile nu sunt configurate încă. Te rugăm să încerci din nou mai târziu.')
      return
    }

    setSubmitting(true)
    window.location.href = checkoutUrl
  }

  const contactLink = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>

  return (
    <ChapterOverlay id="donate" scene={scene} visible={visible} particles className="donate-chapter">
      <div className="donate-content">
        {returned ? (
          <div className="panel donate-box donate-result" role="status">
            <span className="donate-box-title">Mulțumim</span>

            <p className="donate-result-text">
              Îți mulțumim că susții {BRANDING.teamName}. Prin donația ta, investești direct în
              robotul nostru, în activitățile STEAM desfășurate în comunitate și în educația și
              viitorul tinerilor. Stripe îți trimite chitanța prin e-mail; dacă ceva nu pare în
              regulă, scrie-ne la {contactLink}.
            </p>

            <button type="button" className="donate-submit" onClick={dismissReturn}>
              Înapoi la formularul de donație
            </button>
          </div>
        ) : (
          <form className="panel donate-box donate-form" onSubmit={handleSubmit}>
            <p className="donate-blurb">
              Prin fiecare donație, investești direct în robotul nostru, în activitățile STEAM pe
              care le desfășurăm în comunitate și în educația și viitorul tinerilor.
            </p>

            <div className="donate-field-group" role="group" aria-labelledby="donate-amount-label">
              <span id="donate-amount-label" className="donate-label">Sumă (RON)</span>
              <div className="donate-amount-row">
                {PRESET_AMOUNTS.map((value) => {
                  const isActive = !customAmount && amount === value
                  return (
                    <button
                      key={value}
                      type="button"
                      className={`donate-amount-pill ${isActive ? 'active' : ''}`}
                      aria-pressed={isActive}
                      onClick={() => { setAmount(value); setCustomAmount('') }}
                    >
                      {value}
                    </button>
                  )
                })}
                <input
                  type="number"
                  inputMode="decimal"
                  className="donate-amount-custom"
                  placeholder="Altă sumă"
                  aria-label="Altă sumă în RON"
                  min={MIN_AMOUNT_RON}
                  max={MAX_AMOUNT_RON}
                  step="0.01"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                />
              </div>
            </div>

            {error && <p className="donate-error" role="alert">{error}</p>}

            <button type="submit" className="donate-submit" disabled={submitting}>
              {submitting
                ? 'Redirecționare către Stripe…'
                : amountIsValid ? `Donează ${effectiveAmount.toLocaleString('ro-RO')} RON` : 'Donează'}
            </button>

            <p className="donate-fineprint">
              Vei plăti pe pagina securizată Stripe; nu vedem niciodată datele cardului tău.
              Preferi altă modalitate de a ne ajuta? Scrie-ne la {contactLink}.
            </p>
          </form>
        )}
      </div>
    </ChapterOverlay>
  )
}
