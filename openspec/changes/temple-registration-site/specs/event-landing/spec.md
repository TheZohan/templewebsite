## ADDED Requirements

### Requirement: Branded Hebrew RTL landing presentation
The site SHALL present a public landing experience in Hebrew with right-to-left layout that frames the event before the registration form. The document SHALL declare `lang="he"` and `dir="rtl"`, and the layout SHALL render correctly right-to-left on mobile and desktop.

#### Scenario: Page loads in Hebrew RTL
- **WHEN** a visitor opens the site
- **THEN** the page renders in Hebrew with right-to-left text direction
- **AND** the document root declares `lang="he"` and `dir="rtl"`

#### Scenario: Responsive on mobile
- **WHEN** a visitor opens the site on a mobile-width viewport
- **THEN** the landing content reflows to a single readable column without horizontal overflow

### Requirement: Event details displayed
The landing SHALL display the event name, date and time (Sept 4, 2026, 8 PM–2 AM), and a description conveying the gathering's purpose and atmosphere.

#### Scenario: Visitor reads event essentials
- **WHEN** a visitor views the landing section
- **THEN** the event name, date, and time are visible
- **AND** a description of the event's purpose/vibe is shown

### Requirement: Pricing displayed
The landing SHALL clearly display the pricing: 121₪ for a single participant and 222₪ for a couple, with currency rendered correctly within the RTL layout.

#### Scenario: Visitor sees prices
- **WHEN** a visitor views the pricing area
- **THEN** both the single price (121₪) and couple price (222₪) are displayed and legible

### Requirement: Ethereal/spiritual visual design
The site SHALL use an ethereal/spiritual aesthetic (soft gradients, organic shapes, gentle motion) while remaining accessible and performant.

#### Scenario: Reduced-motion preference respected
- **WHEN** a visitor's system requests reduced motion
- **THEN** decorative animations are minimized or disabled

#### Scenario: Text remains legible
- **WHEN** decorative backgrounds are rendered
- **THEN** body and heading text maintain sufficient contrast to be readable

### Requirement: Path to registration
The landing SHALL provide a clear call-to-action that leads the visitor to the registration form.

#### Scenario: Visitor proceeds to register
- **WHEN** a visitor activates the primary call-to-action
- **THEN** the registration form is brought into view (scrolled to or navigated to)
