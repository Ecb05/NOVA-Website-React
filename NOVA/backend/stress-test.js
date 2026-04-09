// ============================================
// REALISTIC STRESS TEST FOR NOVA BACKEND
// Save as: stress-test.js
// Run with: node stress-test.js
// ============================================

import autocannon from 'autocannon';

// Configuration
const BASE_URL = 'http://localhost:3001'; // Change to your Digital Ocean URL for production
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// ============================================
// HELPER: Generate Unique Data
// ============================================

let submissionCounter = 0;
let registrationCounter = 0;

function generateUniqueSubmission() {
  submissionCounter++;
  return {
    submissionTeamId: `TEAM${String(submissionCounter).padStart(4, '0')}`,
    projectUrl: `https://github.com/team${submissionCounter}/hackathon-project`
  };
}

function generateUniqueRegistration() {
  registrationCounter++;
  const teamNum = registrationCounter;
  
  return {
    teamName: `Test Team ${teamNum}`,
    teamLeaderEmail: `leader${teamNum}@test.com`,
    teamLeaderPhone: `91${String(8000000000 + teamNum)}`,
    members: JSON.stringify([
      { name: `Member 1 Team ${teamNum}`, phone: `91${String(9000000000 + teamNum)}` },
      { name: `Member 2 Team ${teamNum}`, phone: `91${String(9100000000 + teamNum)}` },
      { name: `Member 3 Team ${teamNum}`, phone: `91${String(9200000000 + teamNum)}` }
    ]),
    transactionId: `TXN${String(teamNum).padStart(8, '0')}`
  };
}

// ============================================
// TEST 1: Submission Endpoint (Critical)
// ============================================

async function testSubmissions() {
  console.log(`\n${COLORS.cyan}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
  console.log(`${COLORS.cyan}${COLORS.bright}   TEST 1: SUBMISSION ENDPOINT${COLORS.reset}`);
  console.log(`${COLORS.cyan}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}\n`);
  
  console.log(`${COLORS.yellow}⚡ Scenario: 50 teams submitting in 30 minutes${COLORS.reset}`);
  console.log(`${COLORS.yellow}📊 Test: 20 concurrent submissions for 60 seconds${COLORS.reset}\n`);

  const result = await autocannon({
    url: `${BASE_URL}/api/submit`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    connections: 20, // 20 concurrent users
    duration: 60, // 60 seconds
    
    // This function generates unique data for EACH request!
    setupClient: (client) => {
      client.on('response', () => {
        // Generate new data after each response
        const data = generateUniqueSubmission();
        client.setBody(JSON.stringify(data));
      });
    },
    
    // Initial body (will be replaced by setupClient)
    body: JSON.stringify(generateUniqueSubmission())
  });

  printResults(result, 'SUBMISSION');
  return result;
}

// ============================================
// TEST 2: Registration Endpoint (Less Critical)
// ============================================

async function testRegistrations() {
  console.log(`\n${COLORS.magenta}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
  console.log(`${COLORS.magenta}${COLORS.bright}   TEST 2: REGISTRATION ENDPOINT${COLORS.reset}`);
  console.log(`${COLORS.magenta}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}\n`);
  
  console.log(`${COLORS.yellow}⚡ Scenario: Initial registration period${COLORS.reset}`);
  console.log(`${COLORS.yellow}📊 Test: 10 concurrent registrations for 30 seconds${COLORS.reset}`);
  console.log(`${COLORS.yellow}⚠️  Note: File upload simulation - results may vary${COLORS.reset}\n`);

  const result = await autocannon({
    url: `${BASE_URL}/api/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    connections: 10, // 10 concurrent users (registration is less intense)
    duration: 30, // 30 seconds
    
    setupClient: (client) => {
      client.on('response', () => {
        const data = generateUniqueRegistration();
        client.setBody(JSON.stringify(data));
      });
    },
    
    body: JSON.stringify(generateUniqueRegistration())
  });

  printResults(result, 'REGISTRATION');
  return result;
}

// ============================================
// TEST 3: Announcements Endpoint (Read-heavy)
// ============================================

async function testAnnouncements() {
  console.log(`\n${COLORS.blue}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
  console.log(`${COLORS.blue}${COLORS.bright}   TEST 3: ANNOUNCEMENTS ENDPOINT${COLORS.reset}`);
  console.log(`${COLORS.blue}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}\n`);
  
  console.log(`${COLORS.yellow}⚡ Scenario: Users checking announcements${COLORS.reset}`);
  console.log(`${COLORS.yellow}📊 Test: 50 concurrent reads for 30 seconds${COLORS.reset}\n`);

  const result = await autocannon({
    url: `${BASE_URL}/api/announcements`,
    method: 'GET',
    connections: 50, // Higher concurrency for reads
    duration: 30
  });

  printResults(result, 'ANNOUNCEMENTS');
  return result;
}

// ============================================
// TEST 4: Health Check (Baseline)
// ============================================

async function testHealthCheck() {
  console.log(`\n${COLORS.green}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
  console.log(`${COLORS.green}${COLORS.bright}   TEST 4: HEALTH CHECK (BASELINE)${COLORS.reset}`);
  console.log(`${COLORS.green}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}\n`);
  
  console.log(`${COLORS.yellow}⚡ Scenario: Baseline server performance${COLORS.reset}`);
  console.log(`${COLORS.yellow}📊 Test: 100 concurrent requests for 10 seconds${COLORS.reset}\n`);

  const result = await autocannon({
    url: `${BASE_URL}/api/health`,
    method: 'GET',
    connections: 100,
    duration: 10
  });

  printResults(result, 'HEALTH CHECK');
  return result;
}

// ============================================
// RESULTS FORMATTER
// ============================================

function printResults(result, testName) {
  console.log(`\n${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
  console.log(`${COLORS.bright}   ${testName} RESULTS${COLORS.reset}`);
  console.log(`${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}\n`);

  const avgLatency = result.latency.mean;
  const p99Latency = result.latency.p99;
  const requestsPerSec = result.requests.average;
  const errorRate = ((result.errors / result.requests.total) * 100).toFixed(2);
  const successRate = (100 - errorRate).toFixed(2);

  // Determine status
  let status, statusColor;
  if (testName === 'SUBMISSION') {
    // Submission benchmarks
    if (avgLatency < 3000 && p99Latency < 5000 && errorRate < 1) {
      status = '✅ EXCELLENT';
      statusColor = COLORS.green;
    } else if (avgLatency < 5000 && p99Latency < 8000 && errorRate < 5) {
      status = '⚠️  ACCEPTABLE';
      statusColor = COLORS.yellow;
    } else {
      status = '❌ NEEDS IMPROVEMENT';
      statusColor = COLORS.red;
    }
  } else if (testName === 'ANNOUNCEMENTS') {
    // Read endpoint benchmarks
    if (avgLatency < 1000 && requestsPerSec > 20) {
      status = '✅ EXCELLENT';
      statusColor = COLORS.green;
    } else if (avgLatency < 2000 && requestsPerSec > 10) {
      status = '⚠️  ACCEPTABLE';
      statusColor = COLORS.yellow;
    } else {
      status = '❌ NEEDS IMPROVEMENT';
      statusColor = COLORS.red;
    }
  } else {
    // Generic benchmarks
    if (errorRate < 1 && avgLatency < 2000) {
      status = '✅ EXCELLENT';
      statusColor = COLORS.green;
    } else if (errorRate < 5 && avgLatency < 5000) {
      status = '⚠️  ACCEPTABLE';
      statusColor = COLORS.yellow;
    } else {
      status = '❌ NEEDS IMPROVEMENT';
      statusColor = COLORS.red;
    }
  }

  console.log(`${statusColor}${COLORS.bright}${status}${COLORS.reset}\n`);

  console.log(`${COLORS.bright}Performance Metrics:${COLORS.reset}`);
  console.log(`  Requests/sec:    ${requestsPerSec.toFixed(2)}`);
  console.log(`  Avg Latency:     ${avgLatency.toFixed(2)}ms`);
  console.log(`  P99 Latency:     ${p99Latency.toFixed(2)}ms`);
  console.log(`  Total Requests:  ${result.requests.total}`);
  console.log(`  Errors:          ${result.errors}`);
  console.log(`  Success Rate:    ${successRate}%`);
  console.log(`  Error Rate:      ${errorRate}%`);

  console.log(`\n${COLORS.bright}Latency Distribution:${COLORS.reset}`);
  console.log(`  Min:    ${result.latency.min}ms`);
  console.log(`  P50:    ${result.latency.p50}ms`);
  console.log(`  P75:    ${result.latency.p75}ms`);
  console.log(`  P90:    ${result.latency.p90}ms`);
  console.log(`  P99:    ${result.latency.p99}ms`);
  console.log(`  Max:    ${result.latency.max}ms`);

  // Recommendations
  if (testName === 'SUBMISSION') {
    console.log(`\n${COLORS.bright}Benchmarks for 50 Teams in 30 Minutes:${COLORS.reset}`);
    console.log(`  ${avgLatency < 3000 ? '✅' : '❌'} Avg Latency < 3000ms: ${avgLatency.toFixed(2)}ms`);
    console.log(`  ${p99Latency < 5000 ? '✅' : '❌'} P99 Latency < 5000ms: ${p99Latency.toFixed(2)}ms`);
    console.log(`  ${requestsPerSec > 2 ? '✅' : '❌'} Req/sec > 2: ${requestsPerSec.toFixed(2)}`);
    console.log(`  ${errorRate < 1 ? '✅' : '❌'} Error Rate < 1%: ${errorRate}%`);
  }
}

// ============================================
// MAIN TEST RUNNER
// ============================================

async function runAllTests() {
  console.log(`${COLORS.cyan}${COLORS.bright}`);
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           🚀 NOVA BACKEND STRESS TEST SUITE              ║
║                                                           ║
║   Testing with UNIQUE data for realistic scenarios       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
  console.log(COLORS.reset);

  console.log(`${COLORS.yellow}Target URL: ${BASE_URL}${COLORS.reset}`);
  console.log(`${COLORS.yellow}Time: ${new Date().toISOString()}${COLORS.reset}\n`);

  try {
    // Test 1: Most critical - Submissions during deadline
    await testSubmissions();
    
    console.log(`\n${COLORS.yellow}⏸️  Cooling down for 5 seconds...${COLORS.reset}`);
    await sleep(5000);

    // Test 2: Registration (less critical)
    await testRegistrations();
    
    console.log(`\n${COLORS.yellow}⏸️  Cooling down for 5 seconds...${COLORS.reset}`);
    await sleep(5000);

    // Test 3: Announcements (read-heavy)
    await testAnnouncements();
    
    console.log(`\n${COLORS.yellow}⏸️  Cooling down for 5 seconds...${COLORS.reset}`);
    await sleep(5000);

    // Test 4: Health check baseline
    await testHealthCheck();

    // Summary
    printSummary();

  } catch (error) {
    console.error(`${COLORS.red}${COLORS.bright}❌ Test Error:${COLORS.reset}`, error.message);
    process.exit(1);
  }
}

function printSummary() {
  console.log(`\n${COLORS.green}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
  console.log(`${COLORS.green}${COLORS.bright}   STRESS TEST COMPLETE${COLORS.reset}`);
  console.log(`${COLORS.green}${COLORS.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}\n`);

  console.log(`${COLORS.bright}Summary:${COLORS.reset}`);
  console.log(`  ✅ Total unique submissions generated: ${submissionCounter}`);
  console.log(`  ✅ Total unique registrations generated: ${registrationCounter}`);
  console.log(`\n${COLORS.cyan}Next Steps:${COLORS.reset}`);
  console.log(`  1. Review results above`);
  console.log(`  2. Check Digital Ocean dashboard for CPU/Memory usage`);
  console.log(`  3. Check server logs for errors`);
  console.log(`  4. If all tests pass: ✅ You're ready for deployment!`);
  console.log(`  5. If tests fail: Review bottlenecks and optimize\n`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// RUN TESTS
// ============================================

// Check if URL is accessible first
async function checkHealth() {
  try {
    const response = await fetch(`${BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    console.log(`${COLORS.green}✅ Server is accessible at ${BASE_URL}${COLORS.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${COLORS.red}❌ Cannot connect to ${BASE_URL}`);
    console.error(`   Make sure your server is running!${COLORS.reset}\n`);
    process.exit(1);
  }
}

// Start tests
(async () => {
  await checkHealth();
  await runAllTests();
})();