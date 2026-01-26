export default {
    id: 'sre',
    name: 'SRE',
    icon: '🔥',
    description: 'Site Reliability Engineering practices for building and maintaining reliable, scalable systems.',
    concepts: [
        {
            title: 'SRE Fundamentals',
            content: `SRE applies software engineering to operations. Key principles: Embrace risk, SLOs drive decisions, eliminate toil, automation, monitoring, and incident response.

Google pioneered SRE. Focus on reliability as a feature. Engineers write code to solve operations problems.`,
            codeExample: {
                language: 'bash', code: `# SRE Team Responsibilities
- Define and track SLOs/SLIs
- Build monitoring and alerting
- Automate operational tasks
- Conduct incident response
- Perform capacity planning
- Write postmortems` }
        },
        {
            title: 'SLIs, SLOs, and SLAs',
            content: `SLI (Service Level Indicator): Metric measuring service behavior (latency, error rate, availability). SLO (Objective): Target value for SLI (99.9% availability). SLA (Agreement): Contract with consequences.

SLO = SLI + target. Error budget = 100% - SLO. Burn rate measures consumption speed.`,
            codeExample: {
                language: 'yaml', code: `# Example SLO definitions
availability:
  sli: successful_requests / total_requests
  slo: 99.9%              # 8.76 hours/year downtime
  
latency:
  sli: p99_response_time
  slo: < 200ms for 99% of requests
  
error_rate:
  sli: errors / total_requests
  slo: < 0.1%` }
        },
        {
            title: 'Error Budgets',
            content: `Error budget = 100% - SLO. If SLO is 99.9%, error budget is 0.1%. Budget represents acceptable unreliability. Depleted budget means freeze features, focus on reliability.

Balances velocity and reliability. Product and SRE share accountability. Measured over rolling window.`,
            codeExample: {
                language: 'bash', code: `# Error Budget Calculation
SLO: 99.9% availability
Error Budget: 0.1% = 43.2 minutes/month

If 30 minutes of downtime this month:
Budget remaining: 13.2 minutes (30.6%)
Burn rate: Month is 50% complete, budget 69.4% consumed
Status: Burning too fast!` }
        },
        {
            title: 'Toil Elimination',
            content: `Toil: Manual, repetitive, automatable work without lasting value. SRE goal: Keep toil < 50% of time. Automate or eliminate.

Identify toil by tracking time. Prioritize automation ROI. Document processes first, then automate.`,
            codeExample: {
                language: 'bash', code: `# Examples of toil
- Manual deployments
- Password resets
- Certificate renewals
- Log file cleanup
- Manual scaling
- Repetitive tickets

# Not toil
- Emergency response
- Postmortems
- Automation development
- Architecture reviews` }
        },
        {
            title: 'Monitoring and Observability',
            content: `Three pillars: Metrics, Logs, Traces. USE method: Utilization, Saturation, Errors. RED method: Rate, Errors, Duration.

Alert on symptoms not causes. Actionable alerts only. Dashboards for context.`,
            codeExample: {
                language: 'yaml', code: `# Prometheus alerting rule
groups:
  - name: sre
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          / sum(rate(http_requests_total[5m])) > 0.01
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Error rate exceeds 1%"` }
        },
        {
            title: 'Incident Management',
            content: `Clear roles: Incident Commander, Communications Lead, Operations Lead. Severity levels define response. Blameless culture essential.

Document in real-time. Communicate frequently. Escalate early. Focus on mitigation before root cause.`,
            codeExample: {
                language: 'bash', code: `# Incident severity levels
SEV1: Major outage, customer impact, all hands
SEV2: Partial outage, degraded service, team response
SEV3: Minor issue, workarounds exist, normal hours
SEV4: Low impact, can wait for business hours

# Incident roles
- Incident Commander (IC)
- Communications Lead
- Operations Lead
- Subject Matter Experts` }
        },
        {
            title: 'Postmortems',
            content: `Blameless retrospectives after incidents. Focus on systems, not people. Document timeline, impact, root cause, action items.

Share widely. Track action items to completion. Build organizational knowledge.`,
            codeExample: {
                language: 'bash', code: `# Postmortem template
## Summary
What happened in 1-2 sentences

## Impact
Duration, affected users, revenue impact

## Timeline
Timestamped events

## Root Cause
5 Whys analysis

## Action Items
- Specific, assigned, deadlined tasks

## Lessons Learned
What went well, what could improve` }
        },
        {
            title: 'Capacity Planning',
            content: `Forecast demand. Measure current capacity. Plan for growth. Lead time for provisioning. Load testing validates capacity.

N+1, N+2 redundancy. Headroom for spikes. Track utilization trends.`,
            codeExample: {
                language: 'bash', code: `# Capacity planning considerations
- Current utilization
- Growth rate
- Seasonal patterns
- Lead time to provision
- Cost per unit
- Redundancy requirements

# Formula
Needed capacity = (current_usage * growth_rate) + headroom + redundancy` }
        },
        {
            title: 'Chaos Engineering',
            content: `Intentionally inject failures to find weaknesses. Hypothesis-driven experiments. Start small in production. Minimize blast radius.

Tools: Chaos Monkey, Gremlin, Litmus. Build confidence in system resilience.`,
            codeExample: {
                language: 'yaml', code: `# Chaos experiment example
experiment:
  name: "API server failure"
  hypothesis: "System survives single API server failure"
  steady_state:
    - probe: http_response
      url: https://api.example.com/health
      expected: 200
  action:
    type: kill-pod
    target: api-server
    percentage: 33
  rollback:
    type: automatic
    timeout: 5m` }
        },
        {
            title: 'On-Call Best Practices',
            content: `Fair rotation. Clear escalation paths. Runbooks for common issues. Adequate compensation. Post-shift handoffs.

Alert fatigue is real. Review and tune alerts. Track pager load metrics.`,
            codeExample: {
                language: 'bash', code: `# On-call metrics to track
- Number of pages per shift
- Mean time to acknowledge (MTTA)
- Mean time to resolve (MTTR)
- Pages by hour/day
- Root cause distribution
- Actionable vs non-actionable ratio

# SRE target: < 2 pages per 12-hour shift` }
        }
    ],
    questions: [
        { question: 'What is the difference between SLI, SLO, and SLA?', answer: `SLI: Metric (what you measure). SLO: Target (internal goal). SLA: Contract (external commitment with consequences). Start with SLIs, set SLOs slightly stricter than SLAs.` },
        { question: 'Explain error budgets.', answer: `Error budget = 100% - SLO. Represents acceptable unreliability. When depleted, freeze features, improve reliability. Balances velocity vs stability. Shared between product and SRE.` },
        { question: 'What is toil and how do you eliminate it?', answer: `Toil: Manual, repetitive, automatable, no lasting value, scales with service. Keep < 50% of time. Identify, measure, automate. Prioritize by frequency and impact.` },
        { question: 'How do you approach blameless postmortems?', answer: `Focus on systems, not people. Assume good intentions. Ask "how did system allow this?" not "who caused this?". Psychological safety essential. Action items improve systems.` },
        { question: 'What makes a good SLO?', answer: `User-focused (measures what matters to users). Achievable (realistic). Measurable (automated tracking). Meaningful (drives decisions). Not 100% (allows error budget for innovation).` },
        { question: 'Explain the USE and RED methods.', answer: `USE (resources): Utilization, Saturation, Errors. Good for infrastructure. RED (services): Rate, Errors, Duration. Good for services. Use together for complete picture.` },
        { question: 'What is a good on-call rotation?', answer: `Fair distribution. 1-2 week shifts. Avoid single points of failure. Clear escalation. Runbooks. Compensation. < 2 pages per shift target. Regular review of pager load.` },
        { question: 'How do you reduce alert fatigue?', answer: `Only actionable alerts. Remove noisy alerts. Set appropriate thresholds. Group related alerts. Require action items for every page. Review alert effectiveness regularly.` },
        { question: 'What is chaos engineering?', answer: `Controlled failures to find weaknesses. Hypothesis-driven experiments. Start small, minimize blast radius. Build confidence in resilience. Tools: Chaos Monkey, Gremlin.` },
        { question: 'How do you handle an incident?', answer: `Acknowledge quickly. Assign roles (IC, Comms, Ops). Mitigate first, debug later. Communicate frequently. Document in real-time. Escalate early. Postmortem after.` },
        { question: 'What is the difference between SRE and DevOps?', answer: `DevOps: Culture, practices, breaking silos. SRE: Specific implementation using software engineering. SRE is a way to implement DevOps. SRE has specific practices (SLOs, error budgets).` },
        { question: 'How do you measure reliability?', answer: `Define SLIs (availability, latency, error rate). Set SLOs. Track error budget consumption. MTTR, MTBF for incidents. User-facing metrics over infrastructure metrics.` },
        { question: 'Explain capacity planning.', answer: `Forecast demand based on growth. Measure current capacity. Add headroom and redundancy. Account for lead time. Load test to validate. Regular reviews.` },
        { question: 'What is golden signals?', answer: `Four key metrics: Latency, Traffic, Errors, Saturation. From Google SRE book. Covers most monitoring needs. Start dashboards and alerts with these.` },
        { question: 'How do you balance feature development and reliability?', answer: `Error budget is the balance. Features ship when budget allows. Reliability work when budget depleted. Product and SRE both accountable. SLO is data-driven decision point.` }
    ]
};
