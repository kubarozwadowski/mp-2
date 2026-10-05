import styled from 'styled-components'
import type { Deal } from '../types/Deal'

interface DealsProps {
  deals: Deal[]
  isLoading: boolean
  error: string
}

const Page = styled.main`
  min-height: 100vh;
  padding: 28px;

  @media (max-width: 600px) {
    padding: 16px;
  }
`

const Shell = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 32px;
  padding: 56px 0 34px;
  border-bottom: 1px solid #9ca49e;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 36px 0 26px;
  }
`

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: #5d6961;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const Title = styled.h1`
  max-width: 750px;
  margin: 0;
  font-size: clamp(3.2rem, 8vw, 7rem);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 0.87;
`

const Intro = styled.p`
  max-width: 320px;
  margin: 0;
  color: #4e5a52;
  font-size: 0.92rem;
  line-height: 1.65;
`

const CatalogBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  color: #5d6961;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  display: flex;
  min-height: 390px;
  flex-direction: column;
  padding: 24px;
  border: 1px solid #c6cac4;
  border-radius: 2px;
  background: #faf9f4;
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 8px 8px 0 #d8d84d;
  }
`

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 46px;
`

const Category = styled.span`
  color: #5d6961;
  font-family: 'DM Mono', monospace;
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Risk = styled.span<{ $stable: boolean }>`
  padding: 5px 8px;
  border: 1px solid ${({ $stable }) => ($stable ? '#94a166' : '#c49a72')};
  border-radius: 20px;
  color: #4e5a52;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  text-transform: uppercase;
`

const Vendor = styled.h2`
  margin: 0 0 8px;
  font-size: 1.7rem;
  font-weight: 600;
  letter-spacing: -0.045em;
`

const Tier = styled.p`
  margin: 0 0 18px;
  color: #3c5545;
  font-family: 'DM Mono', monospace;
  font-size: 0.76rem;
`

const Description = styled.p`
  display: -webkit-box;
  margin: 0 0 24px;
  overflow: hidden;
  color: #5d6961;
  font-size: 0.82rem;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid #dedfd9;
`

const Tag = styled.span`
  padding: 4px 7px;
  background: #e8e9df;
  color: #4e5a52;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
`

const CardLink = styled.a`
  display: inline-block;
  margin-top: 18px;
  color: #171d19;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Message = styled.p<{ $error?: boolean }>`
  margin: 60px 0;
  padding: 28px;
  border: 1px solid ${({ $error }) => ($error ? '#a94b3f' : '#c6cac4')};
  color: ${({ $error }) => ($error ? '#7d2f27' : '#4e5a52')};
  background: #faf9f4;
  text-align: center;
`

function Deals({ deals, isLoading, error }: DealsProps) {
  return (
    <Page>
      <Shell>
        <Header>
          <div>
            <Eyebrow>Developer resources / 2026</Eyebrow>
            <Title>Free Stack Index</Title>
          </div>
          <Intro>
            A concise field guide to useful free tiers for building and
            shipping software without a large starting budget.
          </Intro>
        </Header>

        <CatalogBar>
          <span>Current selection</span>
          <span>{deals.length.toString().padStart(2, '0')} offers</span>
        </CatalogBar>

        {isLoading && <Message>Loading verified offers...</Message>}
        {error && <Message $error>{error}</Message>}

        {!isLoading && !error && (
          <Grid aria-label="Developer offers">
            {deals.map((deal) => (
              <Card key={deal.vendor}>
                <CardTop>
                  <Category>{deal.category}</Category>
                  <Risk $stable={deal.risk_level === 'stable'}>
                    {deal.risk_level}
                  </Risk>
                </CardTop>
                <Vendor>{deal.vendor}</Vendor>
                <Tier>{deal.tier} tier</Tier>
                <Description>{deal.description}</Description>
                <Tags>
                  {deal.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
                <CardLink href={deal.url} target="_blank" rel="noreferrer">
                  View offer →
                </CardLink>
              </Card>
            ))}
          </Grid>
        )}
      </Shell>
    </Page>
  )
}

export default Deals
