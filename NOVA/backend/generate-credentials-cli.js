import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * NOVA Admin Credential Generator (Command Line Version)
 * 
 * Usage:
 *   node generate-credentials-cli.js
 *   node generate-credentials-cli.js myusername mypassword
 * 
 * Examples:
 *   node generate-credentials-cli.js
 *   node generate-credentials-cli.js admin MySecurePass123!
 *   node generate-credentials-cli.js nova_admin
 */

async function generateCredentials() {
  // Get username and password from command line arguments
  const args = process.argv.slice(2);
  
  let username = args[0] || 'nova_admin';
  let password = args[1];

  // If no password provided, generate one
  if (!password) {
    password = crypto.randomBytes(16).toString('base64').slice(0, 20);
    console.log('\n✅ No password provided - generated a secure random password!\n');
  } else {
    // Validate password length
    if (password.length < 12) {
      console.log('\n⚠️  WARNING: Password is less than 12 characters!');
      console.log('   Consider using a longer password for better security.\n');
    }
  }

  // Generate password hash
  console.log('🔨 Generating password hash...');
  const passwordHash = await bcrypt.hash(password, 10);

  // Generate JWT secret
  console.log('🔑 Generating JWT secret...\n');
  const jwtSecret = crypto.randomBytes(64).toString('hex');

  // Display results
  console.log('='.repeat(60));
  console.log('✅ CREDENTIALS GENERATED SUCCESSFULLY!');
  console.log('='.repeat(60));
  
  console.log('\n📋 COPY THESE TO YOUR .env FILE:\n');
  console.log(`ADMIN_USERNAME=${username}`);
  console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log(`JWT_SECRET=${jwtSecret}`);
  
  console.log('\n' + '='.repeat(60));
  console.log('🔑 YOUR LOGIN CREDENTIALS (SAVE THESE!):\n');
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
  
  console.log('\n' + '='.repeat(60));
  console.log('⚠️  IMPORTANT:');
  console.log('='.repeat(60));
  console.log('• Save your password securely');
  console.log('• Never commit .env to Git');
  console.log('• Keep JWT_SECRET secret');
  console.log('• Type the PASSWORD (not hash) when logging in');
  console.log('='.repeat(60) + '\n');
}

// Run the generator
generateCredentials().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});