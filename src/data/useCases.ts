// Use cases from "20261026_Use Case Discovery Pack_v0.2.pptx" (catalogue slides; one entry per use case).
// Generated from the deck: edit the deck and regenerate rather than editing by hand.
import type { Category, UseCase } from "./types";

export const USE_CASES: UseCase[] = [
  {
    "id": "s-agentic-ai-for-portfolio-and-fm-intelligence",
    "title": "Agentic AI for portfolio and FM intelligence",
    "category": "service",
    "familyId": "genai",
    "maturity": "emerging",
    "group": "Property, Community & Projects Advisory",
    "summary": "AI agents analyze the portfolio and act on findings.",
    "steps": [
      "Portfolio, space, cost and FM data are connected.",
      "Users ask questions in natural language; agents analyze data and recommend or trigger actions.",
      "Follow-ups are automated."
    ],
    "output": "The output is portfolio insight and automated actions.",
    "need": "It is needed because portfolio data is spread across many systems and decisions are slow.",
    "recommendation": "Deprioritise",
    "technology": "JLL Falcon AI platform powering Azara and agentic AI",
    "value": "JLL: 28% of organizations had embedded AI across FM operations by 2025 (46% of large enterprises)",
    "implementer": "JLL",
    "applicability": "Needs clean, connected data AGFS does not yet have. Revisit after CAFM and data foundations.",
    "citation": {
      "label": "JLL - Qualitative (market survey)",
      "url": "https://www.jll.com/en-ae/newsroom/jll-adds-ai-capabilities-to-jll-azara-to-transform-data-interaction-for-work-dynamics-clients"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 3
    }
  },
  {
    "id": "s-iot-predictive-maintenance-with-mobile-alerts",
    "title": "IoT predictive maintenance with mobile alerts",
    "category": "service",
    "familyId": "predictive",
    "maturity": "scaling",
    "group": "Hard FM & Technical Maintenance",
    "summary": "Sensors warn of failures before they happen.",
    "steps": [
      "IoT sensors on chillers, AHUs, pumps and motors stream temperature, vibration, current and run-time data.",
      "Machine-learning models compare live data with each asset's normal pattern and predict likely failures.",
      "An alert and a predictive work order are pushed to the technician's phone."
    ],
    "output": "The output is maintenance done just before failure rather than after it.",
    "need": "It is needed because breakdowns in hot climates cause tenant complaints, emergency call-outs and SLA penalties.",
    "recommendation": "Long-term invest",
    "technology": "IoT sensors (3,000+ asset points), predictive models, cloud FM platform (JLL); Imtedaad (Imdaad); HITEK (Farnek)",
    "value": "50% less unplanned downtime; client on target for >5x ROI by end-2025 (forecast)",
    "implementer": "JLL; Imdaad; Farnek",
    "applicability": "Needed to compete with Imdaad, Farnek and global players in hard FM. Start on chillers and AHUs in Al Ghurair's own buildings, then scale.",
    "citation": {
      "label": "JLL - Quantified (company-reported, part",
      "url": "https://www.jll.com/en-us/client-stories/ai-powered-facilities-management"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 4
    }
  },
  {
    "id": "s-ai-vibration-diagnostics-for-rotating-equipment",
    "title": "AI vibration diagnostics for rotating equipment",
    "category": "service",
    "familyId": "predictive",
    "maturity": "scaling",
    "group": "Hard FM & Technical Maintenance",
    "summary": "Specialist vibration readings are diagnosed by AI instead of scarce analysts.",
    "steps": [
      "A technician (or a wireless sensor) captures the vibration signature of a pump, motor or fan.",
      "An AI diagnostic engine identifies the fault type (e.g., bearing wear, misalignment) and its severity.",
      "Engineers prioritize crews on the most critical faults."
    ],
    "output": "The output is a ranked fault list.",
    "need": "It is needed because rotating equipment failures are costly and expert vibration analysts are scarce in the region.",
    "recommendation": "Deprioritise",
    "technology": "Azima DLI TRIO vibration analyzer + AI diagnostic engine",
    "value": "Saved a cogeneration client 'tens of thousands of dollars in just one day'; scaled from 1 to 5 sites",
    "implementer": "JLL (also: Empower piloted wireless vibration monitoring (see below))",
    "applicability": "Value is confined to costly rotating plant and needs vibration data AGFS lacks. Park until IoT foundations exist.",
    "citation": {
      "label": "Fluke (Azima DLI) - Quantified (vendor c",
      "url": "https://www.fluke.com/en-us/learn/blog/predictive-maintenance/azima-jll-predictive-maintenance-facility-management"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 4
    }
  },
  {
    "id": "s-ai-occupancy-forecasting",
    "title": "AI occupancy forecasting",
    "category": "service",
    "familyId": "predictive",
    "maturity": "scaling",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "AI predicts how many people will be in the building weeks ahead.",
    "steps": [
      "Badge, booking, sensor and weather data are combined.",
      "Models forecast occupancy by floor and day.",
      "Cleaning, catering and HVAC resources are planned to the forecast."
    ],
    "output": "The output is resource plans matched to demand.",
    "need": "It is needed because hybrid working has made occupancy volatile, so fixed service levels waste money.",
    "recommendation": "Consider for pilot",
    "technology": "JLL Azara machine learning; CBRE Dynamic Services",
    "value": "JLL says some firms reach up to 95% accuracy in occupancy projection",
    "implementer": "JLL; CBRE",
    "applicability": "Easy to trial on existing data, but value for AGFS's client mix is unproven. Pilot with one office or mall client before any wider offer.",
    "citation": {
      "label": "JLL - Quantified (company-reported)",
      "url": "https://www.jll.com/en-us/insights/optimizing-beyond-the-grid"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 4
    }
  },
  {
    "id": "s-omni-channel-24-7-customer-care-center",
    "title": "Omni-channel 24/7 customer care center",
    "category": "service",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "A single 24/7 contact point replaces site-by-site phone calls.",
    "steps": [
      "A tenant or client raises a request by phone, email, web portal or app.",
      "An agent (or rules engine) classifies it by service and urgency, creates a ticket in the CAFM and starts the SLA clock.",
      "The ticket is routed to the right site team, escalated if the clock is at risk, and closed with feedback."
    ],
    "output": "The output is a tracked ticket and a full service history.",
    "need": "It is needed because untracked requests are the main cause of missed SLAs and client complaints in multi-site FM contracts.",
    "recommendation": "Quick win",
    "technology": "Contact-center platform, web portal, mobile app, CAFM integration",
    "value": "30,000+ requests handled in 2021; ISO 18295 certified two years running",
    "implementer": "AGFS (Al Ghurair)",
    "applicability": "AGCEL is already in place and clients feel the difference at once. Scale it now, adding AI triage and remote alerts as the first step to a command center.",
    "citation": {
      "label": "REM Times - Quantified (company-reported",
      "url": "https://www.remtimes.com/blogs/news/ag-facilities-solutions-receives-iso-certification-in-recognition-of-outstanding-customer-care.php"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 5
    }
  },
  {
    "id": "s-client-self-service-portal",
    "title": "Client self-service portal",
    "category": "service",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "Clients log into a web portal to raise and follow their own requests.",
    "steps": [
      "The client submits a request or checks status online.",
      "The portal reads from the helpdesk/CAFM and shows live progress, service reports and contract documents.",
      "The client signs off or rates the job."
    ],
    "output": "The output is self-served requests and transparent service records.",
    "need": "It is needed because clients increasingly expect real-time visibility, and every 'where is my job?' call costs helpdesk time.",
    "recommendation": "Deprioritise",
    "technology": "Web client portal linked to helpdesk/CAFM",
    "value": "Fewer status-chasing calls; better client visibility (not quantified)",
    "implementer": "AGFS (Al Ghurair); Imdaad (also: Imdaad FS Portal)",
    "applicability": "The portal exists, and further investment adds little revenue or client value today. Fold live SLA data into the care center and Building on a Page instead.",
    "citation": {
      "label": "AG Facilities Solutions website - Qualit",
      "url": "https://agfacilitiesme.com/home"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 5
    }
  },
  {
    "id": "s-mobile-field-app-with-qr-asset-scan-and-voice-photo-capture",
    "title": "Mobile field app with QR asset scan and voice/photo capture",
    "category": "service",
    "familyId": "frontline",
    "maturity": "established",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "Technicians run their whole job from a phone.",
    "steps": [
      "The technician receives the job and scans the asset's QR code on arrival.",
      "The app pulls up asset history and checklists; readings are captured by photo or voice.",
      "The job is closed on the spot with evidence (photos, signatures, timestamps)."
    ],
    "output": "The output is a complete digital job record and clean asset data.",
    "need": "It is needed because paper job cards arrive days late, are often incomplete and cannot prove the work was done.",
    "recommendation": "Deprioritise",
    "technology": "Mobile CMMS app, QR codes, AI speech and photo capture",
    "value": "75% reduction in maintenance response times; 90% improvement in data accuracy (semiconductor client)",
    "implementer": "JLL; AGFS (Al Ghurair) (also: AGFS mobile CAFM (Triway; vendor claim))",
    "applicability": "The mobile app is already live, so a further upgrade adds little new value. Treat QR asset tagging as routine CAFM housekeeping, not an innovation project.",
    "citation": {
      "label": "JLL - Quantified (company-reported)",
      "url": "https://www.jll.com/en-us/client-stories/ai-powered-facilities-management"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 6
    }
  },
  {
    "id": "s-capex-energy-measures-with-ipmvp-verified-shared-savings",
    "title": "Capex energy measures with IPMVP-verified shared savings",
    "category": "service",
    "familyId": "esg",
    "maturity": "established",
    "group": "Energy, Sustainability & Environment",
    "summary": "Energy-saving retrofits are paid for out of verified savings.",
    "steps": [
      "An ASHRAE Level 2 audit identifies measures (variable-speed drives, LED with sensors, RO and condensate recovery).",
      "The measures are installed and metered.",
      "Savings are verified for five years under the IPMVP protocol and shared between owner and provider."
    ],
    "output": "The output is verified savings reports and shared savings.",
    "need": "It is needed because owners will only fund retrofits if the savings are guaranteed and proven.",
    "recommendation": "Long-term invest",
    "technology": "ASHRAE Level 2 audit; VFDs, LED + occupancy sensors, RO, condensate recovery; Hubgrade M&V",
    "value": "2020: 12.7% energy cost cut; AED 19.2m; 2019-20 combined 74.1 GWh and 471,394 m3 saved",
    "implementer": "Majid Al Futtaim (also: Enova)",
    "applicability": "The contract model that makes energy services bankable. Build with an ESCO partner once AGFS has a savings track record.",
    "citation": {
      "label": "Enova - Quantified (IPMVP, vendor-report",
      "url": "https://www.enova-me.com/media/case-studies/majid-al-futtaim-malls"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 7
    }
  },
  {
    "id": "s-guaranteed-savings-epc-for-cinemas",
    "title": "Guaranteed-savings EPC for cinemas",
    "category": "service",
    "familyId": "esg",
    "maturity": "established",
    "group": "Energy, Sustainability & Environment",
    "summary": "Cinemas sign a contract that guarantees a fixed percentage of savings.",
    "steps": [
      "A consumption baseline is set for each cinema.",
      "HVAC/AHU measures are installed and controlled via Hubgrade.",
      "Savings are measured annually against the 14.8% guarantee over six years, piloted at two sites then replicated."
    ],
    "output": "The output is guaranteed utility savings.",
    "need": "It is needed because cinemas are energy-intensive and owners prefer savings risk to sit with the provider.",
    "recommendation": "Deprioritise",
    "technology": "HVAC/AHU measures + Hubgrade control",
    "value": "Guaranteed 14.8% saving; 2024: >2m kWh electricity and >2,000 m3 water saved at six cinemas",
    "implementer": "Majid Al Futtaim (also: Enova)",
    "applicability": "Needs proven metering, baselines and ESCO capability first. Revisit after no-capex energy optimization succeeds.",
    "citation": {
      "label": "Enova - Quantified (guaranteed + reporte",
      "url": "https://www.enova-me.com/media/news/majid-al-futtaim-leisure-entertainment-cinemas-signs-new-energy-performance-contract"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 7
    }
  },
  {
    "id": "s-command-control-centre-as-a-service-energy-fdd-and-bill-vali",
    "title": "Command Control Centre as a Service: energy FDD and bill validation",
    "category": "service",
    "familyId": "esg",
    "maturity": "scaling",
    "group": "Energy, Sustainability & Environment",
    "summary": "Energy monitoring is sold as a managed service from a command center.",
    "steps": [
      "Meters, IoT and BMS data plus utility bills are connected to the Talisen platform.",
      "Analytics validate bills, detect faults and flag waste.",
      "The FM team acts on the findings."
    ],
    "output": "The output is validated bills and an energy action list.",
    "need": "It is needed because utility billing errors and unnoticed faults quietly inflate operating cost.",
    "recommendation": "Long-term invest",
    "technology": "Talisen Enterprise Sustainability Platform, IoT analytics",
    "value": "Not quantified publicly (partnership offer; operating scale not published)",
    "implementer": "Imdaad",
    "applicability": "Real client value from catching faults and billing errors, but data readiness is low. Build through a platform partner once meter and BMS data are connected.",
    "citation": {
      "label": "Construction Week Online - Qualitative (",
      "url": "https://www.constructionweekonline.com/products-services/imdaad-partners-with-talisen-for-energy-management-tech"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 7
    }
  },
  {
    "id": "s-carbon-accounting-to-support-client-esg-reporting-and-net-ze",
    "title": "Carbon accounting to support client ESG reporting and net-zero targets",
    "category": "service",
    "familyId": "esg",
    "maturity": "scaling",
    "group": "Energy, Sustainability & Environment",
    "summary": "AGFS offers clients a carbon and ESG reporting service as part of the FM contract.",
    "steps": [
      "Energy, water, waste, fuel and refrigerant data from the sites are collected through the FM platform.",
      "Carbon software converts them into Scope 1, 2 and 3 emissions.",
      "Reports and reduction plans are packaged into client reviews and bids."
    ],
    "output": "The outputs are client carbon reports, reduction roadmaps and stronger sustainability scores in tenders.",
    "need": "It is needed because UAE government and corporate clients increasingly score bidders on ESG capability, and carbon data sits naturally with the FM provider.",
    "recommendation": "Long-term invest",
    "technology": "Carbon Accounting and Management Software; ESG Reporting and Management Software - applied as: HITEK Scope 1-3 carbon calculator, energy and waste data platform",
    "value": "Farnek launched a HITEK-developed digital tool to help UAE businesses measure Scope 1-3 emissions on the journey to net zero (not quantified).",
    "implementer": "Farnek (HITEK); Majid Al Futtaim (assured ESG data)",
    "applicability": "Strong client value as ESG reporting tightens, but meter data and a partner platform are needed first. Plan it alongside the energy services roadmap.",
    "citation": {
      "label": "Farnek - company-reported",
      "url": "https://www.farnek.com/farnek-launches-digital-solution-to-support-uae-businesses-on-their-journey-to-net-zero/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 8
    }
  },
  {
    "id": "s-portfolio-energy-optimization-from-a-remote-operations-cente",
    "title": "Portfolio energy optimization from a remote operations center",
    "category": "service",
    "familyId": "bms",
    "maturity": "scaling",
    "group": "Energy, Sustainability & Environment",
    "summary": "One central team optimizes energy across a whole portfolio.",
    "steps": [
      "BMS, meter and IoT data from all sites are consolidated into one platform.",
      "A remote center benchmarks sites, spots waste (e.g., plant running out of hours) and retunes set-points and schedules site by site.",
      "Savings are tracked on portfolio dashboards."
    ],
    "output": "The output is lower energy spend across many buildings.",
    "need": "It is needed because energy is one of the largest controllable costs in UAE buildings and individual sites rarely have the skills to optimize it.",
    "recommendation": "Long-term invest",
    "technology": "Multi-BMS data aggregation, unified FM platform, remote ops center",
    "value": "18% reduction in energy spend; USD 1.2m saved (national retailer)",
    "implementer": "CBRE",
    "applicability": "AGFS's clearest energy white space. Build the capability with group properties as the anchor client.",
    "citation": {
      "label": "CBRE - Quantified (company-reported)",
      "url": "https://www.cbre.com/insights/articles/the-self-optimizing-portfolio-building-intelligence-that-transforms-fm-operations"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 9
    }
  },
  {
    "id": "s-no-capex-portfolio-energy-optimization-via-remote-monitoring",
    "title": "No-capex portfolio energy optimization via remote monitoring",
    "category": "service",
    "familyId": "bms",
    "maturity": "scaling",
    "group": "Energy, Sustainability & Environment",
    "summary": "Energy savings are found by retuning existing equipment, with no capital spend.",
    "steps": [
      "Chiller, AHU, pump and cooling-tower data plus mall opening hours flow into the Hubgrade center.",
      "Remote analysts retune schedules, temperature and CO2 set-points, chilled-water temperature and free cooling.",
      "Savings are measured against a baseline."
    ],
    "output": "The output is optimized operation across 15 malls in 5 countries.",
    "need": "It is needed because most buildings run plant out of hours or at wasteful set-points that nobody notices.",
    "recommendation": "Consider for pilot",
    "technology": "Enova Hubgrade monitoring + BMS data",
    "value": "Year 1: 8.2% energy cost cut, 8.7% electricity, 6.5% water; AED 12m saved; 20,974 t CO2 avoided",
    "implementer": "Majid Al Futtaim (also: Enova (Veolia JV))",
    "applicability": "Needs no client capital and is feasible today, but savings at AGFS sites are unproven. Pilot on Al Ghurair Centre and group buildings to build the case.",
    "citation": {
      "label": "Enova - Quantified (IPMVP, vendor-report",
      "url": "https://www.enova-me.com/media/case-studies/majid-al-futtaim-malls"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 9
    }
  },
  {
    "id": "s-mega-mall-energy-performance-contract-run-from-a-control-cen",
    "title": "Mega-mall energy performance contract run from a control center",
    "category": "service",
    "familyId": "bms",
    "maturity": "scaling",
    "group": "Energy, Sustainability & Environment",
    "summary": "A landmark mall's energy performance is guaranteed and run remotely.",
    "steps": [
      "60,000 measurement points track energy, water and waste.",
      "After audit and retrofit, the Hubgrade control center monitors anomalies and triggers on-site action.",
      "Performance is reported against the contract."
    ],
    "output": "The output is guaranteed energy performance at Mall of the Emirates.",
    "need": "It is needed because large, complex malls lose significant energy to drift and faults that only continuous monitoring catches.",
    "recommendation": "Deprioritise",
    "technology": "Hubgrade control center (Dubai), 60,000 measurement points",
    "value": "34,000 t CO2 emissions cut (Veolia claim; period not stated)",
    "implementer": "Majid Al Futtaim (also: Enova / Veolia)",
    "applicability": "A full guaranteed-performance contract needs proven capability first. Revisit once no-capex optimization succeeds.",
    "citation": {
      "label": "Veolia - Quantified (vendor claim)",
      "url": "https://www.veolia.com/en/media/planetlive/energy-efficiency-tested-crisis"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 9
    }
  },
  {
    "id": "s-virtual-maintenance-remote-alarm-triage-and-remote-fix",
    "title": "Virtual maintenance: remote alarm triage and remote fix",
    "category": "service",
    "familyId": "bms",
    "maturity": "scaling",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "A remote operations center resolves alarms before anyone drives to site.",
    "steps": [
      "BMS alarms and fault signals from many buildings flow into one platform.",
      "AI filters noise and ranks the alarms that matter; remote engineers diagnose and, where possible, fix the fault remotely (e.g., reset or shut down equipment).",
      "Only genuine site work is dispatched, with triage notes attached."
    ],
    "output": "The output is fewer truck rolls and better-prepared technicians.",
    "need": "It is needed because most BMS alarms are nuisance alarms, and unnecessary dispatches waste labour and fuel.",
    "recommendation": "Long-term invest",
    "technology": "CBRE Nexus AI platform, BMS integration, remote operations center",
    "value": "Maintenance cost and energy use down 'as much as 20%'; dispatches down 25% on average",
    "implementer": "CBRE",
    "applicability": "The single step that moves AGFS towards a command center. Invest once CAFM and IoT foundations are live.",
    "citation": {
      "label": "Facilities Dive - Quantified (company-re",
      "url": "https://www.facilitiesdive.com/news/cbre-smart-facilities-management-maintenance-billion-square-feet/693274/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 10
    }
  },
  {
    "id": "s-entertainment-venues-central-command-center",
    "title": "Entertainment venues central command center",
    "category": "service",
    "familyId": "bms",
    "maturity": "emerging",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "Leisure venues are connected to one central command view.",
    "steps": [
      "BMS coverage is extended across entertainment and cinema venues.",
      "Data is brought into a central command center.",
      "Operators monitor and respond across the portfolio."
    ],
    "output": "The output is central oversight of leisure assets.",
    "need": "It is needed because dispersed leisure venues have high energy loads and limited on-site engineering.",
    "recommendation": "Deprioritise",
    "technology": "BMS extension across leisure venues (project valued over USD 400k)",
    "value": "Project stage; results not yet published",
    "implementer": "Majid Al Futtaim",
    "applicability": "A venue-specific center adds little; one multi-service AGFS command center is the better route.",
    "citation": {
      "label": "Majid Al Futtaim - Qualitative (project)",
      "url": "https://www.majidalfuttaim.com/docs/default-source/reports/maf-sus-pages-full-15-09.pdf"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 10
    }
  },
  {
    "id": "s-sensor-based-demand-driven-cleaning",
    "title": "Sensor-based demand-driven cleaning",
    "category": "service",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Soft FM & Hospitality Services",
    "summary": "Cleaners go where people actually were, not where the rota says.",
    "steps": [
      "Occupancy and usage sensors count footfall per room or washroom.",
      "Analytics convert usage into cleaning need and trigger alerts.",
      "Schedules are adjusted daily to demand."
    ],
    "output": "The output is need-based cleaning schedules.",
    "need": "It is needed because fixed rotas over-clean empty areas and under-clean busy ones, wasting labour and hurting satisfaction.",
    "recommendation": "Deprioritise",
    "technology": "Disruptive Technologies sensors + Spica GemEx dashboards (ISS); Dynamic Services (CBRE)",
    "value": "More efficient cleaning, better quality data and staff engagement",
    "implementer": "ISS; CBRE",
    "applicability": "Adds little new revenue, and occupancy sensing is not yet in place across sites. Revisit once large client buildings carry sensors.",
    "citation": {
      "label": "Spica Technologies - Qualitative",
      "url": "https://www.spicatech.co.uk/project/elevating-cleaning-efficiency-and-quality-for-iss-norway/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 11
    }
  },
  {
    "id": "s-iot-tracking-of-cleaning-machines-and-tools",
    "title": "IoT tracking of cleaning machines and tools",
    "category": "service",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Soft FM & Hospitality Services",
    "summary": "Every cleaning machine is tracked like a fleet asset.",
    "steps": [
      "IoT trackers and QR codes record each machine's location, run-time and usage.",
      "The platform flags idle or overused machines and triggers servicing.",
      "Equipment is rebalanced across sites."
    ],
    "output": "The output is fewer lost or idle machines and planned servicing.",
    "need": "It is needed because large cleaning fleets are expensive and often under-utilized or misplaced across sites.",
    "recommendation": "Deprioritise",
    "technology": "ToolSense asset-operations platform, IoT, QR codes",
    "value": "Covers 500,000+ machines used by 300,000+ staff in 30+ countries",
    "implementer": "ISS",
    "applicability": "Limited revenue or client value at AGFS's current fleet size. Revisit if a large, machine-intensive soft FM contract is won.",
    "citation": {
      "label": "ToolSense - Quantified (scale)",
      "url": "https://toolsense.io/press/iss-toolsense-global-strategic-partnership"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 11
    }
  },
  {
    "id": "s-portfolio-smart-metering-and-bms-utility-monitoring",
    "title": "Portfolio smart metering and BMS utility monitoring",
    "category": "service",
    "familyId": "iot",
    "maturity": "established",
    "group": "Energy, Sustainability & Environment",
    "summary": "Every store and building reports its own utility use.",
    "steps": [
      "BMS and smart meters record consumption per asset and store.",
      "The data is tracked against targets and anomalies are flagged.",
      "Assured figures feed ESG and green-finance reporting."
    ],
    "output": "The output is audit-ready energy and water data.",
    "need": "It is needed because lenders and investors now require verified sustainability data.",
    "recommendation": "Consider for pilot",
    "technology": "BMS across malls, hotels, offices, stores, cinemas; smart electricity meters (Carrefour, 8 countries)",
    "value": "Company-wide energy use down 6.5% vs 2023; 34% cut in Scope 1+2 vs 2019 baseline",
    "implementer": "Majid Al Futtaim",
    "applicability": "Proven and easy to deploy, but the client value still needs proving. Pilot on Al Ghurair's own properties as the data base for energy services.",
    "citation": {
      "label": "Majid Al Futtaim - Quantified (assured r",
      "url": "https://www.majidalfuttaim.com/docs/default-source/reports/maf-sus-pages-full-15-09.pdf"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 11
    }
  },
  {
    "id": "s-24-7-multi-site-command-and-control-room-5g-wi-fi-6",
    "title": "24/7 multi-site command and control room (5G / Wi-Fi 6)",
    "category": "service",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "One 24/7 room oversees cleaning, security and maintenance across many sites.",
    "steps": [
      "Sensors, BMS, cameras and staff devices stream data over 5G/Wi-Fi 6.",
      "Operators and ML models monitor assets, people and tasks, predict issues and reassign staff.",
      "Services are orchestrated centrally rather than site by site."
    ],
    "output": "The output is multi-site service delivery managed from one place.",
    "need": "It is needed because supervising thousands of frontline staff across dispersed sites is the core cost driver in UAE FM.",
    "recommendation": "Long-term invest",
    "technology": "HITEK platform: IoT, BMS, cloud, ML/AI over 5G/Wi-Fi 6",
    "value": "Up to 17% manpower cost reduction vs traditional FM management (company estimate)",
    "implementer": "Farnek",
    "applicability": "Worth building given AGFS's scale; AGCEL's 24/7 processes give a head start. A 12-24 month programmed.",
    "citation": {
      "label": "Farnek - Quantified (company estimate)",
      "url": "https://www.farnek.com/hitek-chief-explains-how-innovation-can-ease-and-accelerate-digital-transformation-in-fm-sector/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 12
    }
  },
  {
    "id": "s-comfort-and-occupancy-iot-data-platform",
    "title": "Comfort and occupancy IoT data platform",
    "category": "service",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "Sensors tell the FM team how the space actually feels and is used.",
    "steps": [
      "Sensors measure temperature, humidity, CO2, noise and occupancy.",
      "The platform consolidates data, flags booked-but-empty rooms and comfort problems.",
      "FM and workplace teams adjust HVAC, cleaning and space allocation."
    ],
    "output": "The output is evidence-based comfort and space decisions.",
    "need": "It is needed because occupant comfort complaints are subjective until backed by data.",
    "recommendation": "Long-term invest",
    "technology": "IoT sensors + Context& data platform on Microsoft",
    "value": "Better workplace conditions and customer satisfaction",
    "implementer": "ISS (also: Aldar Saadiyat Grove air-quality and noise sensors)",
    "applicability": "Valuable for client experience and digital positioning, but data and integration are not ready. Build once the command room and metering foundations exist.",
    "citation": {
      "label": "Context& - Qualitative",
      "url": "https://contextand.com/customer-success-stories/iss"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 12
    }
  },
  {
    "id": "s-building-on-a-page-live-building-dashboard",
    "title": "'Building on a Page' live building dashboard",
    "category": "service",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Integrated FM, Helpdesk & Command Centre",
    "summary": "Clients see the whole building on one live page.",
    "steps": [
      "Occupancy, cost, service and sustainability data are pulled from FM systems.",
      "They are aggregated into a single dashboard per building.",
      "Client and provider review performance together."
    ],
    "output": "The output is a one-page live performance view.",
    "need": "It is needed because clients want transparency without wading through monthly reports.",
    "recommendation": "Quick win",
    "technology": "ISS data platform with IoT feeds",
    "value": "Supports data-driven FM decisions",
    "implementer": "ISS",
    "applicability": "Cheap on existing Power BI and visible to clients at renewal. Launch with one flagship client now, then roll out across key accounts.",
    "citation": {
      "label": "ManagerWissen - Qualitative",
      "url": "https://manager-wissen.com/how-iss-is-transforming-facility-services-with-the-cloud-iot-and-ai/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 12
    }
  },
  {
    "id": "s-hybrid-human-robot-cleaning-units",
    "title": "Hybrid human-robot cleaning units",
    "category": "service",
    "familyId": "robots",
    "maturity": "scaling",
    "group": "Soft FM & Hospitality Services",
    "summary": "Robots take the repetitive floor cleaning; people do the detail work.",
    "steps": [
      "Autonomous scrubbers run pre-mapped routes and report telemetry (area cleaned, battery, faults).",
      "The CAFM dashboard assigns robot and human tasks and auto-raises service requests when a robot fails.",
      "Managers see cleaning performance in real time."
    ],
    "output": "The output is consistent, measurable cleaning of large areas.",
    "need": "It is needed because labour costs and availability are under pressure while clients want proof of cleaning quality.",
    "recommendation": "Consider for pilot",
    "technology": "SoftBank Robotics autonomous cleaners + HITEK CAFMTEK dashboards",
    "value": "30+ robots deployed, 60 more on order; used at Dubai Airports, du, Yas Marina Circuit, Abu Dhabi University",
    "implementer": "Farnek",
    "applicability": "Proven robots that crews adopt easily, but value depends on very large open floors. Pilot on one mall or airport-scale contract and measure the labour freed.",
    "citation": {
      "label": "Farnek - Quantified (company-reported)",
      "url": "https://www.farnek.com/farnek-expands-hybrid-cleaning-unit-du/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 13
    }
  },
  {
    "id": "s-canteen-collaborative-robot-linked-to-occupancy-sensors",
    "title": "Canteen collaborative robot linked to occupancy sensors",
    "category": "service",
    "familyId": "robots",
    "maturity": "emerging",
    "group": "Soft FM & Hospitality Services",
    "summary": "A collaborative robot helps clear canteen tables.",
    "steps": [
      "Fixed sensors map which tables have been used.",
      "The robot navigates to them, picks up cups and bottles and wipes tables with AI vision.",
      "Staff focus on service and detail tasks."
    ],
    "output": "The output is automated table clearing.",
    "need": "It is needed because canteen clearing is repetitive, physically demanding work that is hard to staff.",
    "recommendation": "Deprioritise",
    "technology": "Mobile cobot with AI vision + occupancy sensors",
    "value": "Pilot (FacilityCobot consortium); relieves repetitive physical work",
    "implementer": "ISS",
    "applicability": "Catering is not a core AGFS line and the technology is still at R&D stage.",
    "citation": {
      "label": "ISS - Pilot",
      "url": "https://www.issworld.com/en/news/2022/06/23/mobile-collaboration-robots-to-automate-cleaning-tasks-in-canteens"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 13
    }
  },
  {
    "id": "s-drone-facade-inspection-with-ai-defect-detection",
    "title": "Drone facade inspection with AI defect detection",
    "category": "service",
    "familyId": "drones",
    "maturity": "emerging",
    "group": "Hard FM & Technical Maintenance",
    "summary": "Drones inspect high-rise facades in minutes.",
    "steps": [
      "A drone captures thousands of high-definition (and thermal) facade images.",
      "Cloud AI detects and classifies cracks, corrosion and sealant failures and maps them to elevations.",
      "The client receives an interactive defect report."
    ],
    "output": "The output is a located defect list.",
    "need": "It is needed because gondola and rope-access inspections are slow, costly and risky.",
    "recommendation": "Consider for pilot",
    "technology": "Camera drones + cloud AI (e.g., H3 Zoom.AI Facade Inspector)",
    "value": "Scans a high-rise in minutes instead of weeks; avoids gondolas and work at height Ejadah (Dubai Holding) was one of the first in the region to use EVO4HSE drones.",
    "implementer": "Dubai Holding (Ejadah) (also: H3 Dynamics; UAE drone service providers)",
    "applicability": "Adds to AGFS's facade and rope-access offer. Trial through a drone service partner rather than buying kit.",
    "citation": {
      "label": "Trade Arabia - Qualitative (vendor claim",
      "url": "https://www.tradearabia.com/news/CONS_342650.html"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 14
    }
  },
  {
    "id": "i-ai-field-advisor-for-guided-troubleshooting",
    "title": "AI field advisor for guided troubleshooting",
    "category": "internal",
    "familyId": "genai",
    "maturity": "emerging",
    "group": "Operations & Deployment",
    "summary": "Technicians get an AI 'senior engineer' in their pocket.",
    "steps": [
      "The technician describes the symptom by voice or text.",
      "The assistant searches equipment manuals, past work orders and fixes, and returns likely causes with step-by-step troubleshooting. The outcome of the job is logged so future answers improve."
    ],
    "output": "The outputs are guided fixes and a growing knowledge base.",
    "need": "It is needed because experienced technicians are scarce, junior staff often work alone on site, and repeat visits caused by wrong diagnoses erode both margin and SLA performance.",
    "recommendation": "Long-term invest",
    "technology": "AI Agents; AI Engineering - applied as: Generative AI assistant in field app (voice/text) trained on manuals and past fixes",
    "value": "Reduced downtime and shorter resolution times reported (not quantified).",
    "implementer": "Imdaad; JLL",
    "applicability": "Lifts first-time fix, but needs clean CAFM history and field adoption. Plan for 12-24 months.",
    "citation": {
      "label": "Imdaad AI Centre of Excellence - company",
      "url": "https://imdaad.ae/technology-and-innovation/imdaad-ai-centre-of-excellence"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 17
    }
  },
  {
    "id": "i-ai-abstraction-of-contracts-and-commercial-documents",
    "title": "AI abstraction of contracts and commercial documents",
    "category": "internal",
    "familyId": "genai",
    "maturity": "scaling",
    "group": "Commercial & Bidding",
    "summary": "Long contracts are turned into structured, searchable data.",
    "steps": [
      "Contracts and amendments are uploaded.",
      "AI extracts key terms - scope, rates, price-review clauses, penalties, renewal dates, obligations - into a standard template.",
      "A human reviewer validates and the system tracks later amendments without re-reading the whole contract."
    ],
    "output": "The outputs are a contract database quarriable in plain language and renewal/price-review alerts.",
    "need": "It is needed because FM providers hold hundreds of contracts with different terms, and missed renewal dates or escalation rights directly cost revenue.",
    "recommendation": "Quick win",
    "technology": "AI Agents; AI Engineering - applied as: AI document abstraction (DealSumm on Databricks, retrieval-augmented generation)",
    "value": "AI extraction accuracy rose from 65% to over 92% before human review; review time per document fell significantly.",
    "implementer": "JLL",
    "applicability": "High value and low effort with GenAI tools: a searchable register of the top 50 contracts with renewal alerts. Start now.",
    "citation": {
      "label": "Welcome.AI - partner-reported",
      "url": "https://welcome.ai/content/jll-enhances-lease-management-with-ai-driven-data-insights"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 17
    }
  },
  {
    "id": "i-enterprise-genai-assistant-for-bid-account-and-management-te",
    "title": "Enterprise GenAI assistant for bid, account and management teams",
    "category": "internal",
    "familyId": "genai",
    "maturity": "scaling",
    "group": "Commercial & Bidding",
    "summary": "Staff get a secure in-house AI assistant trained on the company's own documents and data. Users ask questions in plain language - past bid answers, contract clauses, client feedback, performance data - and the assistant searches internal sources and drafts answers, summaries or analysis, keeping company data private.",
    "steps": [],
    "output": "The outputs are faster research, drafting and analysis across commercial and management teams.",
    "need": "It is needed because knowledge sits in thousands of documents and inboxes, and public AI tools cannot be used safely with client data.",
    "recommendation": "Quick win",
    "technology": "AI Engineering; AI Agents - applied as: JLL GPT - proprietary LLM on Microsoft Azure fine-tuned on internal data",
    "value": "11,000+ employees used it within 48 hours of launch; about one-quarter of JLL's ~110,000 staff now use its internal AI platforms daily.",
    "implementer": "JLL",
    "applicability": "Ready on the Microsoft stack with clear cost and digital value. Roll out now to bid, account and management teams and track time saved.",
    "citation": {
      "label": "CIO Dive / Runtime - company-reported",
      "url": "https://www.runtime.news/how-jll-built-an-ai-platform-to-help-employees-and-clients-close-the-deal/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 17
    }
  },
  {
    "id": "i-ai-assisted-tender-analysis-and-bid-drafting",
    "title": "AI-assisted tender analysis and bid drafting",
    "category": "internal",
    "familyId": "genai",
    "maturity": "emerging",
    "group": "Commercial & Bidding",
    "summary": "Bid teams load the RFP, scope of work and evaluation criteria into an AI workspace.",
    "steps": [
      "The AI extracts every requirement, deadline and scoring weight and builds a compliance matrix so nothing is missed, then drafts answers from a library of approved past responses, case studies, CVs and certificates, flagging gaps where new content is needed.",
      "The commercial team reviews, adjusts pricing assumptions and finalizes the bid."
    ],
    "output": "The outputs are a compliance checklist, a first-draft response in hours rather than days and a reusable knowledge base.",
    "need": "It is needed because FM firms answer many tenders with short deadlines, and quality and win rates drop when teams rewrite the same content under time pressure.",
    "recommendation": "Consider for pilot",
    "technology": "AI Agents; AI Engineering - applied as: Tender AI platform (e.g., SEQUESTO) linked to a library of past bids, CRM and CAFM data",
    "value": "Vendor reports >30% faster bid turnaround.",
    "implementer": "None of the benchmarks publicly - market example: European FM bid teams (SEQUESTO)",
    "applicability": "Easy to start with GenAI tools, but the internal value still needs proving. Pilot on the next round of tenders and measure hours saved.",
    "citation": {
      "label": "SEQUESTO - vendor claim",
      "url": "https://sequesto.com/blog/facility-management-tender-software-ai/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 18
    }
  },
  {
    "id": "i-ai-contract-review-and-obligations-register",
    "title": "AI contract review and obligations register",
    "category": "internal",
    "familyId": "genai",
    "maturity": "emerging",
    "group": "Commercial & Bidding",
    "summary": "At contracting stage, AI reads the full contract so nothing is signed blind.",
    "steps": [
      "Contracts, scopes and SLAs are uploaded.",
      "The AI analyses clauses, flags risky terms (uncapped penalties, liability, price-adjustment limits) and extracts every obligation, KPI and deadline into a register.",
      "Legal and operations confirm and hand the register to the delivery team."
    ],
    "output": "The outputs are a risk summary for negotiation and an obligations register for mobilization.",
    "need": "It is needed because hidden obligations and penalty regimes in long FM contracts cause margin leakage and disputes.",
    "recommendation": "Quick win",
    "technology": "AI Agents - applied as: Generative AI clause analysis and obligation extraction",
    "value": "Shorter legal review cycles (not quantified).",
    "implementer": "Imdaad",
    "applicability": "High value against warning notices and penalties, and quick to set up with GenAI tools. Start with the contracts carrying the most warnings.",
    "citation": {
      "label": "Imdaad AI Centre of Excellence - company",
      "url": "https://imdaad.ae/technology-and-innovation/imdaad-ai-centre-of-excellence"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 18
    }
  },
  {
    "id": "i-ai-portfolio-intelligence-for-account-growth",
    "title": "AI portfolio intelligence for account growth",
    "category": "internal",
    "familyId": "genai",
    "maturity": "emerging",
    "group": "Commercial & Bidding",
    "summary": "Account teams use AI to find growth opportunities inside existing client portfolios.",
    "steps": [
      "Portfolio, space, cost and service data are connected.",
      "Users ask questions in plain language (e.g., 'which sites are under-served or over-spending?').",
      "AI agents analyze the data and suggest additional services or efficiencies to propose."
    ],
    "output": "The outputs are evidence-based upsell and cross-sell proposals.",
    "need": "It is needed because the cheapest new revenue comes from expanding scope with existing clients.",
    "recommendation": "Deprioritise",
    "technology": "AI Agents; AI Engineering - applied as: JLL Falcon AI platform / Azara analytics",
    "value": "JLL reports 28% of organizations had embedded AI across FM operations by 2025 (46% of large enterprises).",
    "implementer": "JLL",
    "applicability": "Needs clean, connected contract and service data. Revisit once foundations are in place.",
    "citation": {
      "label": "JLL newsroom - market survey",
      "url": "https://www.jll.com/en-ae/newsroom/jll-adds-ai-capabilities-to-jll-azara-to-transform-data-interaction-for-work-dynamics-clients"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 18
    }
  },
  {
    "id": "i-automated-hr-document-processing-for-onboarding-and-visas",
    "title": "Automated HR document processing for onboarding and visas",
    "category": "internal",
    "familyId": "genai",
    "maturity": "established",
    "group": "Support Functions - HR",
    "summary": "Bots process the paperwork that comes with every new hire.",
    "steps": [
      "Passports, visas, Emirates IDs, certificates and contracts are uploaded.",
      "AI extracts the data and validates it.",
      "Bots create employee records, trigger visa and medical steps and set reminders for document expiry."
    ],
    "output": "The outputs are complete employee files and expiry alerts.",
    "need": "It is needed because onboarding thousands of frontline staff generates huge document volumes, and errors or expired documents create compliance fines and delay deployment.",
    "recommendation": "Consider for pilot",
    "technology": "AI Agents (intelligent document processing) - applied as: RPA bots and AI document extraction on ERP/HR systems",
    "value": "2,400+ HR documents processed by bots; part of 34,000+ man-hours saved across Imdaad automations.",
    "implementer": "Imdaad",
    "applicability": "Achievable on Dynamics; savings need proving at AGFS volumes. Pilot on onboarding and visa documents.",
    "citation": {
      "label": "Imdaad AI Centre of Excellence - company",
      "url": "https://imdaad.ae/technology-and-innovation/imdaad-ai-centre-of-excellence"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 19
    }
  },
  {
    "id": "i-ai-led-high-volume-frontline-recruitment-and-onboarding",
    "title": "AI-led high-volume frontline recruitment and onboarding",
    "category": "internal",
    "familyId": "genai",
    "maturity": "scaling",
    "group": "Support Functions - HR",
    "summary": "A chat-based AI assistant runs the hiring funnel for frontline roles such as cleaners, technicians and security staff.",
    "steps": [
      "Candidates apply by mobile or WhatsApp-style chat.",
      "The assistant screens them against role criteria, answers their questions, schedules interviews automatically and collects documents for onboarding and visas.",
      "Recruiters step in only for final selection."
    ],
    "output": "The outputs are a pre-screened pipeline, booked interviews and faster time-to-hire.",
    "need": "It is needed because FM providers must mobilize hundreds of staff within weeks of a contract award, and manual recruiting is the main bottleneck to on-time mobilization.",
    "recommendation": "Deprioritise",
    "technology": "AI Agents - applied as: Conversational recruitment platform (Paradox)",
    "value": "Sodexo hired 40,000+ people in seven months and cut time-to-hire by 60%.",
    "implementer": "None of the benchmarks publicly - market example: Sodexo",
    "applicability": "Value and adoption are uncertain for AGFS's recruitment model today. Revisit once HR processes are digitized.",
    "citation": {
      "label": "Paradox case study - vendor-reported",
      "url": "https://www.paradox.ai/case-studies/sodexo"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 19
    }
  },
  {
    "id": "i-integrated-purchase-to-pay-with-invoice-travel-and-expense-a",
    "title": "Integrated purchase-to-pay with invoice, travel and expense automation",
    "category": "internal",
    "familyId": "genai",
    "maturity": "established",
    "group": "Support Functions - Finance",
    "summary": "Invoices, travel bookings and employee expenses run through one automated SAP-based workflow.",
    "steps": [
      "Invoices are captured and matched automatically.",
      "Travel and expenses are booked and reconciled through integrated tools.",
      "Consolidated invoicing replaces many small one-off supplier invoices."
    ],
    "output": "The outputs are fewer invoices to process, faster approvals and clearer spend data.",
    "need": "It is needed because FM firms with many sites generate a long tail of small invoices and expense claims that clog finance teams.",
    "recommendation": "Quick win",
    "technology": "AI Agents (agentic process automation) - applied as: xSuite invoice automation integrated with SAP Concur and TravelpoolEurope",
    "value": "Reduced administrative workload, fewer one-time vendors and vendor invoices, improved cash flow through automated and consolidated invoicing (company/vendor-reported, 2026).",
    "implementer": "ISS",
    "applicability": "Proven automation on Dynamics with strong cost savings. Start now with high-volume small invoices and expense claims.",
    "citation": {
      "label": "xSuite case study - vendor-reported",
      "url": "https://www.xsuite.com/resources/case-study/hybrid-automated-and-scalable-iss-simplifies-its-p2p-processes/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 19
    }
  },
  {
    "id": "i-automated-finance-shared-services-model",
    "title": "Automated finance shared-services model",
    "category": "internal",
    "familyId": "genai",
    "maturity": "established",
    "group": "Support Functions - Finance",
    "summary": "Country- or business-specific finance processes are consolidated into one standardized, automated shared-services model.",
    "steps": [
      "Processes are mapped and standardized.",
      "Transactional work (invoices, reconciliations) moves to a shared center with automation and duplicate-payment controls.",
      "Local teams focus on business partnering."
    ],
    "output": "The outputs are faster invoice processing, lower finance cost and stronger controls.",
    "need": "It is needed because fragmented finance processes across entities and contracts are slow, costly and prone to duplicate payments.",
    "recommendation": "Deprioritise",
    "technology": "AI Agents (agentic process automation) - applied as: Consolidated finance shared-services center with automation and duplicate-audit tools (with Cognizant)",
    "value": "Moved from multiple country-specific financial processes to one consolidated, automated model; invoices processed faster and more cost-effectively (company-reported).",
    "implementer": "ISS",
    "applicability": "A Group-level decision with heavy change; AGFS should feed into Al Ghurair Investment rather than lead.",
    "citation": {
      "label": "ERP Today - company-reported",
      "url": "https://erp.today/cognizant-and-iss-extend-partnership-to-drive-innovation/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 20
    }
  },
  {
    "id": "i-touchless-supplier-invoice-processing",
    "title": "Touchless supplier invoice processing",
    "category": "internal",
    "familyId": "genai",
    "maturity": "scaling",
    "group": "Support Functions - Finance",
    "summary": "Supplier invoices are processed end-to-end by AI agents.",
    "steps": [
      "Invoices arrive by email or portal.",
      "AI reads them, matches them to purchase orders and goods receipts, codes them to the right contract and cost center, routes exceptions and posts approved invoices for payment."
    ],
    "output": "The outputs are posted invoices, an exceptions queue and audit trails.",
    "need": "It is needed because FM firms receive large volumes of small supplier invoices across hundreds of contracts, and manual processing is slow, error-prone and hides true contract cost.",
    "recommendation": "Consider for pilot",
    "technology": "AI Agents (autonomous invoice processing) - applied as: AI agents for invoice capture, three-way matching and approvals (e.g., Deloitte Zora AI)",
    "value": "92% touchless processing rate; invoice processing time down 50-75%; invoice processing FTEs down 50%.",
    "implementer": "None of the benchmarks publicly - market example: Deloitte client (Zora AI)",
    "applicability": "Proven AP automation. Pilot on the highest-volume supplier invoices after procure-to-pay RPA.",
    "citation": {
      "label": "Deloitte case study - consultant-reporte",
      "url": "https://www.deloitte.com/us/en/what-we-do/case-studies/hands-off-the-task-eyes-on-the-outcome.html"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 20
    }
  },
  {
    "id": "i-contract-margin-and-cash-dashboards-with-conversational-bi",
    "title": "Contract margin and cash dashboards with conversational BI",
    "category": "internal",
    "familyId": "genai",
    "maturity": "scaling",
    "group": "Support Functions - Finance",
    "summary": "Managers see the profitability of every contract and can ask questions in plain language.",
    "steps": [
      "ERP, payroll, procurement and CAFM data are joined at contract level.",
      "Dashboards show revenue, cost, margin, billing and collections.",
      "An AI chatbot answers questions such as 'which contracts lost margin this quarter and why?'."
    ],
    "output": "The outputs are real-time contract P&Ls and early warnings on loss-making accounts.",
    "need": "It is needed because FM margins are thin and losses on a contract are often discovered only at year-end.",
    "recommendation": "Quick win",
    "technology": "AI Agents; AI Engineering - applied as: Oracle Analytics Cloud / Power BI dashboards with AI chatbot",
    "value": "Faster decisions; 9,884 service reports generated through Imdaad's analytics (company-reported).",
    "implementer": "Imdaad; JLL (Azara)",
    "applicability": "A low-cost extension of Power BI and Dynamics with direct financial-control benefits.",
    "citation": {
      "label": "Zawya - company-reported",
      "url": "https://www.zawya.com/en/press-release/companies-news/imdaad-unveils-ai-center-of-excellence-to-revolutionize-operational-excellence-c4251loq"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 20
    }
  },
  {
    "id": "i-multilingual-voice-and-whatsapp-hr-assistant-for-low-literac",
    "title": "Multilingual voice and WhatsApp HR assistant for low-literacy workers",
    "category": "internal",
    "familyId": "genai",
    "maturity": "scaling",
    "group": "Support Functions - HR",
    "summary": "Workers ask HR questions the way they already communicate - by WhatsApp text or voice note, in their own language.",
    "steps": [
      "The assistant verifies the worker's identity, answers questions from policies and the worker's own HR record (leave balance, payslip, visa status), lets them apply for leave or raise a request in a few taps, and replies by voice for those with low literacy.",
      "Anything it cannot resolve is handed to a human."
    ],
    "output": "The outputs are instant answers, fewer supervisor and HR queries and logged requests.",
    "need": "It is needed because many blue-collar workers have limited English and literacy, use basic phones and depend almost entirely on supervisors for information.",
    "recommendation": "Long-term invest",
    "technology": "AI Agents; AI Engineering - applied as: WhatsApp / voice-note HR assistant with multilingual generative AI (e.g., Mintor, PaySpace Pacey) integrated with HR and payroll",
    "value": "Sea Harvest: recruitment admin cut 80% and jobseeker application cost cut 90%; Mintor reports HR admin time reduced by up to 80% across clients in 52 countries.",
    "implementer": "None of the benchmarks publicly - market example: Sea Harvest (via Mintor) and other deskless-workforce employers",
    "applicability": "High value for a multilingual, varied-literacy workforce, but needs HR content, integrations and adoption work. Plan for 12-24 months.",
    "citation": {
      "label": "TextIt / Mintor and PaySpace - vendor-re",
      "url": "https://blog.textit.com/blog/read/redefining-access-to-hr-services"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 21
    }
  },
  {
    "id": "i-data-driven-bid-costing-and-pricing",
    "title": "Data-driven bid costing and pricing",
    "category": "internal",
    "familyId": "predictive",
    "maturity": "scaling",
    "group": "Commercial & Bidding",
    "summary": "Bid prices are built from the company's own cost history instead of rules of thumb.",
    "steps": [
      "Inputs are past bid prices, won/lost outcomes, actual labour, material and subcontract costs from delivered contracts, and market benchmarks.",
      "Models estimate the true cost to serve a new scope (e.g., man-hours per m2 by building type), test price scenarios against likely win probability and flag bids that are under- or over-priced."
    ],
    "output": "The outputs are a cost build-up, a recommended price range and margin risk flags.",
    "need": "It is needed because FM contracts are often won on thin margins, and mispricing labour or consumables at bid stage locks in losses for 3-5 years.",
    "recommendation": "Deprioritise",
    "technology": "AI Engineering - applied as: Analytics on historical bids, cost actuals and market benchmarks; costing/pricing engine",
    "value": "IBM's RFP reading, costing, pricing and pipeline tools raised its win rate, with a business impact of about US$350m.",
    "implementer": "None of the benchmarks publicly - market example: IBM Services (tender analytics)",
    "applicability": "Limited cost or workforce benefit today, and clean cost history from MRI is missing. Revisit once job costing data is reliable.",
    "citation": {
      "label": "IBM Research - published research",
      "url": "https://research.ibm.com/publications/analytics-and-operations-research-increases-win-rates-for-ibms-information-technology-service-deals"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 22
    }
  },
  {
    "id": "i-bid-no-bid-qualification-and-win-probability-scoring",
    "title": "Bid/no-bid qualification and win-probability scoring",
    "category": "internal",
    "familyId": "predictive",
    "maturity": "emerging",
    "group": "Commercial & Bidding",
    "summary": "Before committing a bid team, each opportunity is scored for its chance of winning and its strategic fit.",
    "steps": [
      "The model learns from past bids - client type, sector, scope, competitors, price position and outcome - and scores new opportunities in the pipeline.",
      "Leadership uses the score to decide bid/no-bid and to allocate bid resources to the most winnable, most profitable tenders."
    ],
    "output": "The outputs are a ranked pipeline and documented bid decisions.",
    "need": "It is needed because bid teams are a scarce resource, and chasing low-probability tenders wastes cost and distracts from winnable ones.",
    "recommendation": "Consider for pilot",
    "technology": "AI Engineering - applied as: Machine-learning win/loss model on historical bid data; CRM pipeline scoring",
    "value": "Custom machine-learning model achieved over 70% accuracy in win-loss forecasting.",
    "implementer": "None of the benchmarks publicly - market example: Western Specialty Contractors",
    "applicability": "Feasible once bids are logged in a CRM; value still to prove. Pilot scoring on the next round of government tenders.",
    "citation": {
      "label": "IronPros - company-reported",
      "url": "https://www.ironpros.com/product-categories/article/22948267/western-specialty-contractors-smart-bidding-strategies-with-artificial-intelligence"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 22
    }
  },
  {
    "id": "i-ai-spare-parts-and-consumables-inventory-optimization",
    "title": "AI spare-parts and consumables inventory optimization",
    "category": "internal",
    "familyId": "predictive",
    "maturity": "scaling",
    "group": "Support Functions - Procurement",
    "summary": "Stock levels for spares and consumables are set by AI rather than habit.",
    "steps": [
      "Inputs are consumption history, maintenance schedules, asset condition, supplier lead times and part criticality.",
      "The model forecasts demand, recommends safety stock and reorder points, identifies dead stock and suggests transfers between stores."
    ],
    "output": "The outputs are optimized stock policies and a dead-stock list.",
    "need": "It is needed because FM providers tie up cash in slow-moving spares while still suffering stock-outs of critical parts that delay repairs.",
    "recommendation": "Deprioritise",
    "technology": "AI Engineering; Edge Asset Life Cycle Management - applied as: AI spare-parts demand forecasting and inventory optimization (e.g., Wood sparesAI)",
    "value": "40% reduction in inventory value while increasing availability of critical spares (client case).",
    "implementer": "None of the benchmarks publicly - market example: Wood (sparesAI)",
    "applicability": "Data on spares is poor today. Fix inventory tracking (see material issuance deep-dive) before optimizing.",
    "citation": {
      "label": "Wood plc - company-reported",
      "url": "https://www.woodplc.com/solutions/expertise/spares-ai"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 22
    }
  },
  {
    "id": "i-ai-optimization-of-the-subcontractor-and-supply-chain-networ",
    "title": "AI optimization of the subcontractor and supply-chain network",
    "category": "internal",
    "familyId": "predictive",
    "maturity": "scaling",
    "group": "Support Functions - Procurement",
    "summary": "AI analyses how work flows through the subcontractor and supplier network to cut cost and cycle time.",
    "steps": [
      "Supplier performance, prices, response times and spend data across clients are combined.",
      "AI identifies the best-value suppliers per service and region, optimizes allocation and flags slow or costly partners."
    ],
    "output": "The outputs are a rationalized supply chain and faster operational cycles.",
    "need": "It is needed because FM providers depend on large subcontractor networks, and unmanaged supply chains drive both cost and SLA failures.",
    "recommendation": "Deprioritise",
    "technology": "AI Engineering - applied as: Cushman & Wakefield AI+ (proprietary data, AI supply-chain network optimization)",
    "value": "AI has enabled an 80% reduction in operational cycle time and lower client supply-chain costs (company-reported).",
    "implementer": "FM provider example: Cushman & Wakefield",
    "applicability": "AGFS self-delivers most services, so subcontract spend is small. Revisit once procurement data is digital.",
    "citation": {
      "label": "Facilities Dive - company-reported",
      "url": "https://www.facilitiesdive.com/news/cushman-wakefield-launch-ai-plus-strategy/700482/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 23
    }
  },
  {
    "id": "i-ai-drafted-hse-inspection-reports-from-site-photos",
    "title": "AI-drafted HSE inspection reports from site photos",
    "category": "internal",
    "familyId": "vision",
    "maturity": "emerging",
    "group": "Operations & Deployment",
    "summary": "Site safety inspections are written by AI from photos taken on the walk-round.",
    "steps": [
      "The inspector uploads images.",
      "Vision AI identifies hazards such as missing PPE, blocked exits or unsafe ladders.",
      "Generative AI drafts the report with corrective actions.",
      "The inspector reviews and issues it the same day."
    ],
    "output": "The outputs are faster HSE reports and a searchable hazard log.",
    "need": "It is needed because inspection paperwork delays corrective action and consumes supervisor time across many sites.",
    "recommendation": "Consider for pilot",
    "technology": "Computer Vision; AI Agents - applied as: Computer vision + generative AI report drafting",
    "value": "'Safer operations, faster compliance' (not quantified).",
    "implementer": "Imdaad",
    "applicability": "Low-cost trial with off-the-shelf tools on HSE-sensitive contracts.",
    "citation": {
      "label": "Imdaad AI Centre of Excellence - company",
      "url": "https://imdaad.ae/technology-and-innovation/imdaad-ai-centre-of-excellence"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 24
    }
  },
  {
    "id": "i-route-and-task-guidance-app-for-housekeeping-crews",
    "title": "Route and task guidance app for housekeeping crews",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Operations & Deployment",
    "summary": "Soft-services staff get a planned route and task list on their phone at the start of each shift instead of relying on supervisors and memory.",
    "steps": [
      "The app shows daily, weekly or monthly schedules per staff member and records task completion.",
      "Supervisors rebalance crews from the completion data.",
      "Work permits are issued digitally."
    ],
    "output": "The outputs are optimized crew routes, completion evidence and lower supervision effort.",
    "need": "It is needed because CAFM tools focus on technicians while housekeeping - the largest workforce in an FM firm - is usually managed on paper.",
    "recommendation": "Consider for pilot",
    "technology": "Frontline Superapps - applied as: Effy housekeeping app (route and task guidance), digital work permits",
    "value": "25% increase in operational efficiency across manpower optimization and task completion (company-reported).",
    "implementer": "FM provider example: Emrill (UAE)",
    "applicability": "Low cost for AGFS's largest labour pool. Pilot a housekeeping module on one contract to measure productivity.",
    "citation": {
      "label": "CBNME - company-reported",
      "url": "https://cbnme.com/?p=31517"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 25
    }
  },
  {
    "id": "i-dynamic-manpower-and-task-allocation-from-a-central-command-",
    "title": "Dynamic manpower and task allocation from a central command room",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "scaling",
    "group": "Operations & Deployment",
    "summary": "Instead of fixed site rosters managed by local supervisors, one central room allocates frontline staff across many client sites in real time.",
    "steps": [
      "Sensor alerts, helpdesk tickets, staff locations and shift data first stream into a single platform.",
      "The system then matches each task to the nearest available, qualified worker and pushes it to their device, tracks acknowledgement and completion against the contract SLA, and reassigns work when someone is delayed or a site is overloaded."
    ],
    "output": "The outputs are live task assignments, SLA tracking per contract and data on how much labour each site really needs.",
    "need": "It is needed because labour is the largest cost line in an FM contract and rosters set at mobilization quickly drift away from real demand.",
    "recommendation": "Long-term invest",
    "technology": "Frontline Superapps; Collaborative Work Management - applied as: HITEK platform (IoT, CAFM, machine learning), 5G/Wi-Fi 6, smart wearables",
    "value": "Up to 17% lower manpower cost vs traditional FM management (Farnek estimate); CBRE reports 25% fewer technician dispatches.",
    "implementer": "Farnek (HITEK); CBRE (dispatch avoidance)",
    "applicability": "Even a few percent of labour saved outweighs the cost at AGFS's scale. Needs MRI and the mobile app fully live first.",
    "citation": {
      "label": "Farnek - company-reported",
      "url": "https://www.farnek.com/hitek-chief-explains-how-innovation-can-ease-and-accelerate-digital-transformation-in-fm-sector/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 25
    }
  },
  {
    "id": "i-ai-scheduling-and-route-optimization-for-mobile-maintenance-",
    "title": "AI scheduling and route optimization for mobile maintenance teams",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "scaling",
    "group": "Operations & Deployment",
    "summary": "Mobile technicians who cover several client sites a day are scheduled by an optimization engine instead of a dispatcher's spreadsheet.",
    "steps": [
      "The engine takes open jobs, SLA deadlines, technician skills and certifications, live traffic and vehicle locations as inputs.",
      "It clusters jobs by area, sequences visits to minimize driving, predicts realistic job durations from history, and re-optimizes during the day as emergency calls arrive."
    ],
    "output": "The outputs are daily route plans, updated arrival windows and capacity forecasts.",
    "need": "It is needed because UAE mobile teams lose a large share of the day in traffic between sites, which caps the number of jobs per technician and drives overtime.",
    "recommendation": "Consider for pilot",
    "technology": "Collaborative Work Management; Frontline Superapps - applied as: AI field-service scheduling and route optimization (e.g., Fieldproxy, field service management suites)",
    "value": "HVAC contractor case: jobs per technician up 40% (4.5 to 6.3 a day) and drive time down from 2.5 to 1.4 hours (vendor-reported); Vodafone: 28% fewer repeat site visits.",
    "implementer": "HVAC and electrical service contractors using Fieldproxy; Vodafone (AI Field Assist)",
    "applicability": "Usually a standard field-service module. Pilot with one mobile MEP team to prove time saved.",
    "citation": {
      "label": "Fieldproxy case study - vendor-reported",
      "url": "https://www.fieldproxy.ai/blog/hvac-company-increases-daily-jobs-by-40-with-ai-scheduling-d1-43"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 25
    }
  },
  {
    "id": "i-workforce-productivity-analytics-to-right-size-site-staffing",
    "title": "Workforce productivity analytics to right-size site staffing",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "scaling",
    "group": "Operations & Deployment",
    "summary": "Labour on each site is planned from productivity data rather than legacy headcounts.",
    "steps": [
      "The tool combines tasks, areas, frequencies, attendance and quality data per site, benchmarks productivity across similar sites and recommends staffing levels and shift patterns.",
      "Operations managers adjust rosters and track the effect."
    ],
    "output": "The outputs are evidence-based staffing plans and productivity benchmarks.",
    "need": "It is needed because labour is 60-70% of a soft-services contract cost and staffing levels set at bid stage are rarely revisited.",
    "recommendation": "Long-term invest",
    "technology": "Collaborative Work Management - applied as: ABM Workforce Productivity Optimization (WPO) analytics tool",
    "value": "WPO being rolled out across multiple sites, cited by ABM as driving improved efficiency and client outcomes (company-reported, not quantified).",
    "implementer": "FM provider example: ABM Industries (US)",
    "applicability": "One of the highest-value uses of MRI and attendance data across thousands of cleaners. Needs clean data first.",
    "citation": {
      "label": "ABM Q3 2024 earnings call - company-repo",
      "url": "https://www.marketbeat.com/earnings/reports/2024-9-6-abm-industries-incorporated-stock"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 26
    }
  },
  {
    "id": "i-digital-quotations-for-variations-and-additional-works",
    "title": "Digital quotations for variations and additional works",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Commercial & Bidding",
    "summary": "Additional work found on site is quoted and approved digitally.",
    "steps": [
      "A technician or supervisor raises a quotation from the work order with photos.",
      "The module prices it from rate cards and sends it to the client for online approval.",
      "Once approved, it becomes a work order and is billed automatically."
    ],
    "output": "The outputs are faster quotations, approved variation orders and captured extra revenue.",
    "need": "It is needed because variation work on FM contracts is often done without a formal quote and never billed, or delayed for weeks by email approvals.",
    "recommendation": "Quick win",
    "technology": "Frontline Superapps - applied as: Techsphere quotations module linked to asset and work-order data",
    "value": "Single platform saves time on requests and approvals and provides cost savings (company-reported, not quantified).",
    "implementer": "FM provider example: Emrill (UAE)",
    "applicability": "A direct revenue lever: captures and bills variation work. Can likely be configured in MRI Evolution.",
    "citation": {
      "label": "Zawya - company-reported",
      "url": "https://www.zawya.com/en/press-release/companies-news/emrill-launches-techsphere-vbfoicby"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 26
    }
  },
  {
    "id": "i-digital-training-records-and-attendance-module",
    "title": "Digital training, records and attendance module",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "scaling",
    "group": "Support Functions - HR",
    "summary": "Training, employee data and attendance live in the same platform as operations.",
    "steps": [
      "Employee records update in real time.",
      "Staff complete virtual training modules on mobile.",
      "Completion and attendance are tracked and linked to who can be deployed on which job."
    ],
    "output": "The outputs are up-to-date training records and deployable, certified staff lists.",
    "need": "It is needed because sending untrained or uncertified staff to site creates safety and contract-compliance risks, and paper training records are hard to audit.",
    "recommendation": "Quick win",
    "technology": "Collaborative Work Management; Frontline Superapps - applied as: Techsphere training module (virtual training, real-time employee data, attendance tracking)",
    "value": "Launched in 2024 to improve workforce efficiency (company-reported, not quantified).",
    "implementer": "FM provider example: Emrill (UAE)",
    "applicability": "Link existing training records to MRI so only certified staff are deployed: low cost, high compliance.",
    "citation": {
      "label": "Emrill - company-reported",
      "url": "https://www.emrill.com/?p=5475"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 26
    }
  },
  {
    "id": "i-digital-leave-overtime-and-absence-workflow-linked-to-roster",
    "title": "Digital leave, overtime and absence workflow linked to rostering",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Support Functions - HR",
    "summary": "Leave and overtime move from paper and verbal requests to one digital workflow.",
    "steps": [
      "The worker requests leave or confirms overtime in the app.",
      "Rules route it automatically (supervisor, welfare camp, People Services, passport release) with deadlines and escalation.",
      "Once approved the balance updates, the FMS and payroll are updated automatically and the roster shows the absence and the planned replacement.",
      "The system tracks return dates and alerts supervisors if a worker has not returned."
    ],
    "output": "The outputs are faster approvals, accurate balances, absence calendars and return-to-work alerts.",
    "need": "It is needed because paper leave flows with multiple clearances delay approvals, create errors when re-keyed into the FMS and leave supervisors blind to upcoming absences and late returns.",
    "recommendation": "Quick win",
    "technology": "Collaborative Work Management - applied as: Digital leave, overtime and absence workflows in HCM/FMS with rules-based approvals and rostering integration",
    "value": "Platforms report leave and shift requests handled in minutes instead of days; WhatsApp-based HR bots eliminate paper leave forms (vendor-reported).",
    "implementer": "None of the benchmarks publicly - market practice in frontline HR platforms (Staffbase, Beekeeper, WhatsApp HR bots)",
    "applicability": "Replaces a paper process with re-keying; low-risk and gives supervisors absence visibility.",
    "citation": {
      "label": "Staffbase - vendor-reported",
      "url": "https://web-preview.staffbase.com/employee-app"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 27
    }
  },
  {
    "id": "i-digital-grievance-complaint-and-disciplinary-case-management",
    "title": "Digital grievance, complaint and disciplinary case management",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Support Functions - HR",
    "summary": "Every complaint, grievance and disciplinary action becomes a tracked case.",
    "steps": [
      "Workers raise a complaint (e.g., a salary discrepancy) through the app, a WhatsApp bot or the hotline.",
      "The case gets a reference number, a category and an owner.",
      "The worker can see its status and receives updates until it is resolved.",
      "Warnings and disciplinary steps are recorded with evidence and linked to the worker's profile."
    ],
    "output": "The outputs are case histories, resolution-time KPIs and trend reports.",
    "need": "It is needed because hotline and paper-based handling makes outcomes unclear, and workers who cannot see progress lose trust in the process.",
    "recommendation": "Consider for pilot",
    "technology": "Collaborative Work Management; AI Agents - applied as: Case management module for grievances, complaints and disciplinary actions with status tracking (HCM or service-desk platform)",
    "value": "Migrant workers know what options they have for pay-related issues and get their cases addressed in a shorter time because they come forward better prepared (qualitative).",
    "implementer": "None of the benchmarks publicly - market example: 'Fair' chatbot for migrant workers' pay issues (Singapore GovTech hackathon)",
    "applicability": "Easy to build on existing helpdesk tooling; impact rests on worker trust. Pilot with one workforce cluster and track usage.",
    "citation": {
      "label": "Hack for Public Good (GovTech Singapore)",
      "url": "https://www.hack.gov.sg/2025/fair/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 27
    }
  },
  {
    "id": "i-digital-worker-profile-and-skills-passport-for-allocation-an",
    "title": "Digital worker profile and skills passport for allocation and redeployment",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "scaling",
    "group": "Operations & Deployment",
    "summary": "Each worker has one live digital profile instead of information spread across paper, spreadsheets and supervisors' memory.",
    "steps": [
      "Training records, certifications, skills, assignments, attendance, performance scores, warnings, leave history and client feedback flow into the profile from HR, training, attendance and helpdesk systems.",
      "Supervisors search for workers by skill and availability to fill a site or replace an absentee.",
      "Workers can see their own scores and feedback."
    ],
    "output": "The outputs are searchable skill profiles, faster redeployment and transparent performance records.",
    "need": "It is needed because allocating and replacing workers is slow and error-prone when skills and history are undocumented, and performance reviews are opaque to workers.",
    "recommendation": "Long-term invest",
    "technology": "Collaborative Work Management; Frontline Superapps - applied as: Central digital worker profile (skills, certifications, training, performance, warnings, leave, client feedback) linked to rostering",
    "value": "Emrill's training module gives real-time employee data and attendance tracking linked to deployment (company-reported, not quantified).",
    "implementer": "FM provider example: Emrill (UAE) - real-time employee data in Techsphere; ABM (workforce productivity data)",
    "applicability": "The data backbone for dynamic allocation and fair performance management; needs design and data work.",
    "citation": {
      "label": "Emrill - company-reported",
      "url": "https://www.emrill.com/?p=5475"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 27
    }
  },
  {
    "id": "i-digital-onboarding-journey-with-e-signature-and-visa-status-",
    "title": "Digital onboarding journey with e-signature and visa status tracking",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Support Functions - HR",
    "summary": "Hiring and onboarding become a single tracked digital journey for each candidate.",
    "steps": [
      "The candidate receives a link (or WhatsApp flow) to upload documents and sign the offer and contract electronically.",
      "HR and the candidate see each step - visa, medical, Emirates ID, camp allocation, induction - with status and next action.",
      "Automatic reminders chase missing documents.",
      "Data flows straight into HR and payroll."
    ],
    "output": "The outputs are signed contracts, complete files and a live pipeline of pending hires.",
    "need": "It is needed because paper offer letters, manual signatures and call-back-based status tracking delay mobilization and frustrate candidates.",
    "recommendation": "Consider for pilot",
    "technology": "Collaborative Work Management; AI Agents - applied as: Digital onboarding journey with e-signature (e.g., UAE PASS-compatible), document upload, visa/medical status tracker and WhatsApp updates",
    "value": "Imdaad bots processed 2,400+ HR documents; Mintor reports HR admin time cut by up to 80% with chat-based onboarding (vendor-reported).",
    "implementer": "Imdaad (HR document automation, #40); market example: Mintor onboarding modules over WhatsApp",
    "applicability": "Useful, but needs HR process change and links to visa systems. Pilot on the next large mobilization.",
    "citation": {
      "label": "PaySpace / Mintor - vendor-reported",
      "url": "https://www.payspace.com/?p=660400"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 28
    }
  },
  {
    "id": "i-in-app-material-and-tool-requests-with-digital-approval-rout",
    "title": "In-app material and tool requests with digital approval routing",
    "category": "internal",
    "familyId": "workforce",
    "maturity": "established",
    "group": "Support Functions - Procurement",
    "summary": "Workers and supervisors request materials, tools or PPE from their phone instead of chasing paperwork.",
    "steps": [
      "The request (with photo and site) is checked against stock and budget rules.",
      "Small or standard items are auto-approved, others routed to the right approver with a time limit.",
      "Approved requests create a stores issue or purchase request in the ERP and the requester sees the status."
    ],
    "output": "The outputs are faster material availability, an audit trail and consumption data by site.",
    "need": "It is needed because tool procurement is bureaucratic and supervisor-dependent, which delays jobs and wastes technician time.",
    "recommendation": "Consider for pilot",
    "technology": "Frontline Superapps - applied as: In-app material, tool and PPE requests with photo capture and rules-based approval routing into procurement/stores",
    "value": "The Budd Group replaced paper requests processed a full day late with instant photo-based requests routed to the right people (company-reported).",
    "implementer": "FM provider example: The Budd Group (Beekeeper); Farnek (e-procurement)",
    "applicability": "A straightforward module, but value depends on fixing stock tracking first. Pilot on one site alongside the material issuance fix.",
    "citation": {
      "label": "Beekeeper / ADP Marketplace - company-re",
      "url": "https://apps.adp.com/en-us/apps/209466/beekeeper---employee-app/resources"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 28
    }
  },
  {
    "id": "i-automated-utility-bill-validation",
    "title": "Automated utility bill validation",
    "category": "internal",
    "familyId": "esg",
    "maturity": "scaling",
    "group": "Support Functions - Finance",
    "summary": "Utility bills are checked automatically against metered consumption.",
    "steps": [
      "Meter and BMS data and utility bills feed an analytics platform.",
      "The system compares billed with metered use and tariffs, flags errors and anomalies, and highlights waste.",
      "Finance disputes errors and operations fixes the causes."
    ],
    "output": "The outputs are validated bills and recovered overcharges.",
    "need": "It is needed because billing errors and unnoticed faults quietly inflate utility costs, which are often passed through or managed by the FM provider.",
    "recommendation": "Consider for pilot",
    "technology": "Carbon Accounting and Management Software - applied as: Talisen Enterprise Sustainability Platform; utility bill validation analytics",
    "value": "Not quantified publicly (partnership offer).",
    "implementer": "Imdaad (with Talisen)",
    "applicability": "Useful where AGFS manages utilities; access through a platform partner.",
    "citation": {
      "label": "Construction Week Online - qualitative",
      "url": "https://www.constructionweekonline.com/products-services/imdaad-partners-with-talisen-for-energy-management-tech"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 29
    }
  },
  {
    "id": "i-quantified-digital-value-proposition-in-bids",
    "title": "Quantified digital value proposition in bids",
    "category": "internal",
    "familyId": "bms",
    "maturity": "scaling",
    "group": "Commercial & Bidding",
    "summary": "Operational data from delivered contracts becomes proof in new bids.",
    "steps": [
      "Results from live contracts (dispatches avoided, energy saved, response times) are captured, verified and packaged into case studies and savings commitments.",
      "Bid teams insert them into technical and commercial submissions."
    ],
    "output": "The outputs are evidence-backed bid claims and differentiated scoring on technical criteria.",
    "need": "It is needed because evaluators increasingly score innovation and value, and unquantified claims ('technology-driven') no longer differentiate.",
    "recommendation": "Consider for pilot",
    "technology": "Operational AI Systems; Intelligent Infrastructure - applied as: Smart FM operational data packaged as quantified bid evidence",
    "value": "CBRE markets Smart FM with 'up to 20%' cost savings and 25% fewer dispatches; Farnek markets up to 17% manpower savings.",
    "implementer": "CBRE; Farnek",
    "applicability": "Easy to do, value shows in win rates over time. Pilot by capturing verified outcomes on three contracts.",
    "citation": {
      "label": "CBRE Investor Relations - company-report",
      "url": "https://ir.cbre.com/press-releases/detail/206/cbres-ai-powered-facilities-management-solutions-reaches"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 30
    }
  },
  {
    "id": "i-scan-to-bim-digital-twin-for-mobilization-and-asset-baselini",
    "title": "Scan-to-BIM digital twin for mobilization and asset baselining",
    "category": "internal",
    "familyId": "twin",
    "maturity": "scaling",
    "group": "Operations & Deployment",
    "summary": "At contract start, the FM provider builds a digital replica of the site instead of relying on missing or outdated drawings.",
    "steps": [
      "A 3D laser scan captures the building inside and out.",
      "The point cloud is turned into a BIM model with every asset located and tagged.",
      "The model and asset data are loaded into the CAFM so planned maintenance, space and compliance records start from a verified baseline."
    ],
    "output": "The outputs are a verified asset register, an accurate 3D model and maintenance plans that are right from day one.",
    "need": "It is needed because mobilization on inherited sites often starts with incomplete asset lists, which leads to missed maintenance, scope disputes and repeated surveys.",
    "recommendation": "Long-term invest",
    "technology": "Intelligent Connected Infrastructure; Digital Twins of Government (applied to building assets) - applied as: 3D laser scanning (e.g., FARO), Scan-to-BIM, asset information model linked to CAFM",
    "value": "As-built model operational for FM from day one and no repeat surveys needed for future alterations (UK mixed-use handover case); SWG integrates scan-based BIM models directly into CAFM.",
    "implementer": "None of the benchmarks publicly - market example: Service Works Global (FM software provider) Scan-to-BIM for building owner-operators",
    "applicability": "High value for cost control and digital asset data, but survey and BIM capability are not in place. Plan it for large, complex mobilizations, bought in as a survey service.",
    "citation": {
      "label": "Service Works Global - vendor-reported",
      "url": "https://www.swg.com/na/news/lessons-from-digital-construction-week-harnessing-digital-twins-for-smarter-facility-management/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 31
    }
  },
  {
    "id": "i-fleet-telematics-for-maintenance-and-mobilization-vehicles",
    "title": "Fleet telematics for maintenance and mobilization vehicles",
    "category": "internal",
    "familyId": "iot",
    "maturity": "established",
    "group": "Operations & Deployment",
    "summary": "Every service vehicle reports where it is and how it is used.",
    "steps": [
      "Telematics units send GPS position, mileage, idling and driver behaviour.",
      "Dashboards show utilization by contract and flag misuse.",
      "Data feeds route optimization and vehicle pool sizing."
    ],
    "output": "The outputs are fleet utilization reports and lower fuel and maintenance cost.",
    "need": "It is needed because vehicle fleets serving thousands of sites are a large hidden cost, and under-used vehicles tie up capital.",
    "recommendation": "Consider for pilot",
    "technology": "Managed IoT Connectivity - applied as: Vehicle telematics (GPS, usage), fleet dashboards",
    "value": "Not quantified publicly.",
    "implementer": "Farnek (HITEK)",
    "applicability": "Easy to deploy and supports the CEO's fleet visibility ask. Pilot on one mobile maintenance team.",
    "citation": {
      "label": "Construction Week Online - qualitative",
      "url": "https://www.constructionweekonline.com/business/farnek-smart-fm-solutions"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 32
    }
  },
  {
    "id": "i-live-client-performance-dashboards-to-drive-retention-and-re",
    "title": "Live client performance dashboards to drive retention and renewal",
    "category": "internal",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Commercial & Bidding",
    "summary": "Account managers and clients look at the same live performance page instead of debating monthly reports.",
    "steps": [
      "SLA, response, PPM, cost and satisfaction data flow from CAFM into a client dashboard per contract.",
      "Account managers review trends with the client, address issues early and use the evidence at renewal."
    ],
    "output": "The outputs are transparent performance records and earlier warning of at-risk accounts.",
    "need": "It is needed because contract renewals are lost when clients feel unseen, and retention is far cheaper than winning new work.",
    "recommendation": "Consider for pilot",
    "technology": "Smart building platform dashboards; Managed IoT Connectivity - applied as: Client-facing live performance dashboards (e.g., ISS Building on a Page) on CAFM data",
    "value": "ISS reports 94% customer retention in 2025 (dashboards are one of several drivers).",
    "implementer": "ISS",
    "applicability": "Cheap on Power BI. Pilot client-facing dashboards with two top accounts before renewal talks.",
    "citation": {
      "label": "ManagerWissen / ISS - qualitative",
      "url": "https://manager-wissen.com/how-iss-is-transforming-facility-services-with-the-cloud-iot-and-ai/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 32
    }
  },
  {
    "id": "i-remote-monitoring-to-price-leaner-higher-margin-bids",
    "title": "Remote monitoring to price leaner, higher-margin bids",
    "category": "internal",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Commercial & Bidding",
    "summary": "Remote monitoring changes the cost model the bid is built on.",
    "steps": [
      "The bid team designs the service around remote monitoring of assets (e.g., telecom base stations) instead of routine site visits.",
      "Fewer planned visits and smarter dispatch lower the cost to serve.",
      "The saving is used to price below competitors while keeping a higher margin."
    ],
    "output": "The outputs are a cheaper, differentiated bid and a better margin.",
    "need": "It is needed because in price-led tenders the only way to win and still make money is to change how the service is delivered.",
    "recommendation": "Deprioritise",
    "technology": "Managed IoT Connectivity; Edge Asset Life Cycle Management - applied as: Urbanize platform with remote asset monitoring",
    "value": "Bid to a national telecom provider was 20% lower than Emrill's traditional offering and at higher margins (company-reported).",
    "implementer": "FM provider example: Emrill (UAE)",
    "applicability": "Depends on remote-monitoring capability AGFS does not yet have. Revisit once a command center is live.",
    "citation": {
      "label": "Urbanize case study - vendor-reported",
      "url": "https://www.urbanise.com/post/the-emrill-case-study"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 32
    }
  },
  {
    "id": "i-smart-staff-accommodation-management",
    "title": "Smart staff accommodation management",
    "category": "internal",
    "familyId": "iot",
    "maturity": "scaling",
    "group": "Support Functions - HR",
    "summary": "Staff housing is run as a smart building.",
    "steps": [
      "Access, occupancy, energy, water and maintenance data from accommodation blocks feed one platform.",
      "HR and welfare teams track room allocation, conditions and welfare issues.",
      "Maintenance is triggered automatically."
    ],
    "output": "The outputs are better living conditions, lower utility cost and welfare records.",
    "need": "It is needed because worker welfare is under increasing client and regulatory scrutiny and accommodation is a major cost for labour-intensive FM firms.",
    "recommendation": "Deprioritise",
    "technology": "Managed IoT Connectivity; Edge Servers - applied as: Smart building systems for staff accommodation (access, energy, welfare monitoring)",
    "value": "Farnek Village provides 800 rooms built as an intelligent building (not quantified).",
    "implementer": "Farnek",
    "applicability": "Low priority and hard to implement today. Revisit if AGFS takes direct control of labour accommodation.",
    "citation": {
      "label": "CM-Today - qualitative",
      "url": "https://www.cm-today.com/news/community-management/farnek-staff-accommodation-raises-bar-for-intelligent-buildings"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 33
    }
  },
  {
    "id": "i-smartwatch-dispatched-response-and-smart-washrooms",
    "title": "Smartwatch-dispatched response and smart washrooms",
    "category": "internal",
    "familyId": "frontline",
    "maturity": "scaling",
    "group": "Operations & Deployment",
    "summary": "Frontline staff receive tasks on their wrists the moment they are needed.",
    "steps": [
      "Smart washroom sensors detect usage thresholds or low consumables, or a spill is reported.",
      "The system sends the task to the nearest operative's smartwatch and tracks acknowledgement and completion.",
      "Supervisors see response times."
    ],
    "output": "The output is faster response and refills on demand.",
    "need": "It is needed because in malls and communities a slow response to a spill or a dirty washroom is both a safety risk and a reputation risk.",
    "recommendation": "Deprioritise",
    "technology": "Smart washroom sensors, smartwatches, CAFM",
    "value": "The Dubai Mall testimonial: higher productivity, lower manpower cost, fewer slip incidents (not quantified) Ejadah (Dubai Holding) also uses smart toilets and smartwatches to dispatch cleaning tasks.",
    "implementer": "Farnek; Dubai Holding (Ejadah)",
    "applicability": "Needs sensors, devices and new dispatch routines for modest internal benefit. Revisit if a client funds smart washrooms on a large site.",
    "citation": {
      "label": "Farnek - Qualitative",
      "url": "https://www.farnek.com/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 34
    }
  },
  {
    "id": "i-heat-stress-monitoring-for-outdoor-field-staff",
    "title": "Heat-stress monitoring for outdoor field staff",
    "category": "internal",
    "familyId": "wearables",
    "maturity": "emerging",
    "group": "Operations & Deployment",
    "summary": "Outdoor staff are warned before heat illness strikes.",
    "steps": [
      "Wearable biosensors monitor core body temperature, heart rate and activity.",
      "The system alerts the worker and supervisor when heat strain rises.",
      "Supervisors enforce rest, cooling and hydration and adjust shift patterns."
    ],
    "output": "The outputs are early interventions and site-level heat-risk data.",
    "need": "It is needed because UAE summers put landscaping, cleaning, security and MEP staff at serious risk, and heat incidents cause lost time, legal exposure and reputational damage with government clients.",
    "recommendation": "Consider for pilot",
    "technology": "Wearable Monitors for Public Safety; Lone Worker Protection - applied as: Kenzen biosensor wearables, alerting dashboard",
    "value": "EGA extended the programmed to 350 volunteers; zero heat-related illness in 2019 and 2022 across its wider programmed.",
    "implementer": "None of the benchmarks publicly - market example: Emirates Global Aluminum",
    "applicability": "Proven wearables, but benefit and adoption need testing. Run a summer pilot with one outdoor team.",
    "citation": {
      "label": "EGA media release - company-reported",
      "url": "https://media.ega.ae/ega-extends-use-of-wearable-technology-to-beat-the-heat-in-the-uae-summer/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 35
    }
  },
  {
    "id": "i-mobile-hazard-and-incident-reporting-with-live-safety-dashbo",
    "title": "Mobile hazard and incident reporting with live safety dashboard",
    "category": "internal",
    "familyId": "wearables",
    "maturity": "established",
    "group": "Operations & Deployment",
    "summary": "Any worker can report a hazard or incident in seconds from their phone.",
    "steps": [
      "The worker takes a photo, picks a category and location (or records a voice note).",
      "The report is routed automatically to the responsible supervisor and HSE team with a deadline.",
      "The worker sees when it is acknowledged and fixed.",
      "Management sees all open hazards, incidents and trends across sites on one dashboard."
    ],
    "output": "The outputs are faster corrective action, a complete incident register and safety KPIs per site.",
    "need": "It is needed because there is no direct reporting channel today, so risks are reported late or not at all and follow-up is slow and inconsistent.",
    "recommendation": "Consider for pilot",
    "technology": "Lone Worker Protection; Wearable Monitors for Public Safety (safety reporting) - applied as: Mobile hazard and incident reporting app with photos, location and live safety dashboard (e.g., SafetyCulture, EcoOnline)",
    "value": "McAleer & Rushe: 14,000 hazards reported across 25 sites in 12 months via the mobile app, with management linking higher reporting to fewer accidents.",
    "implementer": "None of the benchmarks publicly - market example: McAleer & Rushe (EcoOnline); SafetyCulture used across facility management",
    "applicability": "Feasible with off-the-shelf apps, but value depends on frontline uptake. Pilot on one high-risk contract before scaling.",
    "citation": {
      "label": "EcoOnline case study - company-reported",
      "url": "https://www.ecoonline.com/en-ca/case-studies/mcaleer-rushe/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 35
    }
  },
  {
    "id": "i-ar-remote-expert-assistance-for-field-technicians",
    "title": "AR remote expert assistance for field technicians",
    "category": "internal",
    "familyId": "arvr",
    "maturity": "emerging",
    "group": "Operations & Deployment",
    "summary": "A specialist at head office sees what the technician on site sees.",
    "steps": [
      "The technician streams live video from a phone or headset.",
      "The expert draws on the screen to point at components and guides the repair step by step. Sessions are recorded and reused for training."
    ],
    "output": "The outputs are guided fixes without expert travel and a library of real repair videos.",
    "need": "It is needed because a few senior specialists cannot physically reach thousands of sites, and flying or driving them in is slow and costly.",
    "recommendation": "Deprioritise",
    "technology": "Remote Expert Guidance Solutions; Augmented Reality - applied as: AR on smartphones or headsets with live expert annotation",
    "value": "Vendor claims +25% first-time fix and 30% less technician travel (weak evidence).",
    "implementer": "None of the benchmarks publicly - market example: AR vendors (frontline.io)",
    "applicability": "Benefits are unproven and field adoption is hard today. Revisit once basic field digitization has matured.",
    "citation": {
      "label": "frontline.io - vendor claim",
      "url": "https://www.frontline.io/remote-assist"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 36
    }
  },
  {
    "id": "i-ai-and-xr-based-technical-and-safety-training",
    "title": "AI and XR-based technical and safety training",
    "category": "internal",
    "familyId": "arvr",
    "maturity": "emerging",
    "group": "Support Functions - HR",
    "summary": "New and existing staff learn on virtual equipment and with an AI trainer instead of only in classrooms.",
    "steps": [
      "Training content is built as XR simulations (e.g., chiller start-up, working at height) and as an AI hologram that answers trainees' questions.",
      "Trainees practice repeatedly and assessments are recorded."
    ],
    "output": "The outputs are trained, certified staff and training records per employee.",
    "need": "It is needed because multilingual frontline workforces must be trained fast for each mobilization, and practicing on live equipment is risky.",
    "recommendation": "Deprioritise",
    "technology": "Augmented Reality (XR training) - applied as: AI hologram digital trainer; XR training modules",
    "value": "Not quantified publicly.",
    "implementer": "Farnek (HITEK); AGFS (Al Ghurair) - XR training modules (2021)",
    "applicability": "Content and platform effort outweighs near-term value. Build on existing XR modules later, once training records are digital.",
    "citation": {
      "label": "Farnek - qualitative",
      "url": "https://www.farnek.com/hitek-unveils-ai-hologram-assistant/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 36
    }
  },
  {
    "id": "i-robot-human-crew-planning-for-large-area-cleaning",
    "title": "Robot-human crew planning for large-area cleaning",
    "category": "internal",
    "familyId": "robots",
    "maturity": "scaling",
    "group": "Operations & Deployment",
    "summary": "Operations redesigns cleaning crews around autonomous robots.",
    "steps": [
      "Large open areas are mapped and assigned to robot routes.",
      "Repetitive floor cleaning is given to robots while people focus on detail work.",
      "Robot telemetry (area cleaned, battery, faults) flows into the CAFM, which auto-raises service requests when a robot stops."
    ],
    "output": "The outputs are revised crew sizes per site, measurable cleaning performance and maintenance alerts.",
    "need": "It is needed because cleaning labour is the largest and least flexible cost in soft-services contracts, and clients increasingly want proof of cleaning quality.",
    "recommendation": "Deprioritise",
    "technology": "Autonomous Mobile Robots; Smart Robots - applied as: SoftBank Robotics autonomous scrubbers integrated with HITEK CAFMTEK dashboards",
    "value": "Farnek: 30+ robots deployed with 60 more ordered, reducing 'labour overlap' at Dubai Airports, du, Yas Marina Circuit and Abu Dhabi University.",
    "implementer": "Farnek; FM provider example: Emrill (UAE) - Active AI cleaning robot",
    "applicability": "Needs robots in place and crew redesign first. Revisit once robot cleaning is proven elsewhere.",
    "citation": {
      "label": "Farnek - company-reported",
      "url": "https://www.farnek.com/farnek-expands-hybrid-cleaning-unit-du/"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 37
    }
  },
  {
    "id": "i-on-demand-3d-printing-of-hard-to-source-spare-parts",
    "title": "On-demand 3D printing of hard-to-source spare parts",
    "category": "internal",
    "familyId": "print3d",
    "maturity": "scaling",
    "group": "Support Functions - Procurement",
    "summary": "Procurement prints obsolete or slow-to-import spare parts locally instead of waiting for overseas suppliers.",
    "steps": [
      "Parts with long lead times or minimum order quantities are identified.",
      "They are scanned or redesigned into a digital part library.",
      "Approved parts are printed on demand in the region and quality-checked before use."
    ],
    "output": "The outputs are parts available in days, smaller stock holdings and a reusable digital catalogue.",
    "need": "It is needed because import delays for small electromechanical parts keep assets out of service and force FM providers to hold costly safety stock.",
    "recommendation": "Deprioritise",
    "technology": "Additive Manufacturing; Digital Threads - applied as: Industrial 3D printers, digital part library, reverse engineering of obsolete parts",
    "value": "Metro spare parts produced with 90% less sourcing time and 50% lower cost; RTA reported 50% savings on spare-part purchasing for road facilities.",
    "implementer": "FM provider example: Serco Middle East (Dubai Metro maintenance contractor, with RTA)",
    "applicability": "Niche value and new supply chain. Revisit if obsolete spares become a recurring downtime issue.",
    "citation": {
      "label": "Zawya / Khaleej Times - government-repor",
      "url": "https://www.zawya.com/en/business/rta-3d-prints-dubai-metro-spare-parts-sze6hru1"
    },
    "source": {
      "file": "20261026_Use Case Discovery Pack_v0.2.pptx",
      "slide": 38
    }
  }
];

/** Headline of each technology family's first slide in the deck, per category. */
export const FAMILY_HEADLINES: Record<Category, Record<string, string>> = {
  "service": {
    "genai": "Agentic AI is starting to manage whole portfolios, spotting issues and opportunities across thousands of assets",
    "predictive": "Predictive analytics catch equipment failures before they happen and match service levels to how buildings are really used",
    "workforce": "A modern helpdesk, maintenance system and client portal form the digital foundation every other use case builds on",
    "frontline": "Putting jobs, alerts and asset history on frontline devices speeds response and creates digital proof of every visit",
    "esg": "Verified energy-savings contracts let FM providers sell guaranteed outcomes and share in the savings they create",
    "bms": "Remote monitoring centers cut portfolio energy bills without capital spend and allow providers to guarantee the result",
    "iot": "Sensors let FM providers clean where people actually are, keep cleaning fleets working and give clients audit-ready utility data",
    "robots": "Robots take over repetitive floor and table cleaning so the same crews can cover more space at higher quality",
    "drones": "Drones inspect facades in minutes instead of weeks and remove the cost and risk of work at height"
  },
  "internal": {
    "genai": "GenAI supports technicians in the field and gives commercial teams fast access to contract and account knowledge",
    "predictive": "Machine learning sharpens bid pricing, focuses bid teams on winnable tenders and keeps the right spares in stock",
    "vision": "Computer vision automates safety inspections and cuts catering waste by turning photos into actionable data",
    "workforce": "Smarter scheduling, routing and central dispatch let the same workforce complete more jobs every day",
    "esg": "Verified savings, carbon accounting and bill validation let AGFS sell sustainability outcomes and protect client spend",
    "bms": "Quantifying the value of building analytics in bids turns digital capability into a commercial differentiator",
    "twin": "Scanning sites into a digital twin at mobilization gives a reliable asset baseline from day one of a contract",
    "iot": "Connected vehicles and live performance data cut fleet costs, help win renewals and support leaner, more competitive bids",
    "frontline": "Smartwatch dispatch and smart washroom sensors send each task to the nearest operative and prove response times",
    "wearables": "Wearables and mobile incident reporting protect staff in extreme heat and give leaders a live view of site safety",
    "arvr": "Remote expert support and immersive training build technician capability faster and more safely",
    "robots": "Planning mixed robot-and-human crews lets large-area cleaning contracts be priced and staffed more efficiently",
    "print3d": "On-demand 3D printing shortens the wait for hard-to-source spare parts and reduces the inventory held"
  }
};
