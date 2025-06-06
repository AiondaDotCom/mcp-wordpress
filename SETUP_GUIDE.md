# 🚀 MCP WordPress Setup Guide for saterembiga.test

This guide will help you set up and test the MCP WordPress server with your local WordPress site.

## ✅ Prerequisites Verified

Your WordPress site at `https://saterembiga.test` is **compatible** with MCP WordPress! 

- ✅ WordPress REST API is available
- ✅ All required endpoints are accessible
- ✅ Authentication is supported

## 📋 Step-by-Step Setup

### Step 1: Create Application Password in WordPress

1. **Log into your WordPress admin** at `https://saterembiga.test/wp-admin`

2. **Go to your user profile:**
   - Click on "Users" → "Your Profile" (or "Users" → "All Users" → click your username)

3. **Scroll down to "Application Passwords" section**
   - If you don't see this section, your WordPress version might be older than 5.6
   - You can also try going directly to: `https://saterembiga.test/wp-admin/profile.php`

4. **Create a new application password:**
   - In the "New Application Password Name" field, enter: `MCP WordPress Server`
   - Click "Add New Application Password"
   - **IMPORTANT:** Copy the generated password immediately - you won't see it again!

### Step 2: Configure Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** with your credentials:
   ```bash
   # WordPress Site Configuration
   WORDPRESS_URL=https://saterembiga.test
   WORDPRESS_USERNAME=your_wordpress_username
   WORDPRESS_APP_PASSWORD=your_generated_app_password_here
   
   # For local development with self-signed certificates
   NODE_TLS_REJECT_UNAUTHORIZED=0
   
   # Debug Mode
   DEBUG=true
   ```

   **Replace:**
   - `your_wordpress_username` with your actual WordPress username
   - `your_generated_app_password_here` with the application password you just created

### Step 3: Test the Connection

1. **Run the connection test:**
   ```bash
   npm run test:connection
   ```

   This will test:
   - Authentication with your WordPress site
   - Basic API operations (posts, pages, media, etc.)
   - User permissions and capabilities

2. **Expected output:**
   ```
   🔐 Testing WordPress Connection with Authentication
   
   1. Creating WordPress client...
   ✅ Client created for: https://saterembiga.test
   
   2. Testing authentication...
   ✅ Authentication successful
   
   3. Testing basic API operations...
   ✅ Current user: Your Name (your_username)
   ✅ Found X recent posts
   ✅ Found X pages
   ✅ Found X media items
   ✅ Found X categories
   
   🎉 Connection test completed successfully!
   ```

### Step 4: Start the MCP Server

1. **Start the server:**
   ```bash
   npm run start
   ```

2. **The server will start and wait for MCP client connections**

### Step 5: Test with MCP Client

You can now connect to the MCP server using:

1. **Claude Desktop** (if you have it configured)
2. **Any MCP-compatible client**
3. **Command line testing** (see below)

## 🧪 Testing Commands

```bash
# Test site compatibility
npm run test:site

# Test authentication and basic operations
npm run test:connection

# Test all tools are loaded correctly
node test-tools.js

# Start server in debug mode
npm run dev
```

## 🔧 Troubleshooting

### Authentication Issues

**Problem:** `❌ Authentication failed`
**Solution:**
1. Verify your username is correct
2. Make sure you're using the Application Password, not your regular password
3. Check that Application Passwords are enabled in WordPress

### SSL Certificate Issues

**Problem:** `self-signed certificate` error
**Solution:**
Add to your `.env` file:
```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Connection Issues

**Problem:** `ECONNREFUSED` or site not reachable
**Solution:**
1. Make sure your WordPress site is running
2. Verify the URL is correct: `https://saterembiga.test`
3. Check if you can access the site in your browser

### Permission Issues

**Problem:** `❌ Site settings not accessible`
**Solution:**
This is normal if your user doesn't have administrator privileges. The MCP server will still work for content management.

## 📊 Available Tools

Once connected, you'll have access to **54 WordPress management tools**:

- **Posts:** Create, read, update, delete posts and revisions
- **Pages:** Manage pages and hierarchical content
- **Media:** Upload, manage, and organize media files
- **Users:** User management and profile operations
- **Comments:** Comment moderation and management
- **Taxonomies:** Categories and tags management
- **Site:** Site settings and configuration
- **Auth:** Authentication status and management

## 🎯 Next Steps

1. **Test the connection** using the steps above
2. **Configure your MCP client** to connect to this server
3. **Start managing your WordPress site** through the MCP protocol!

## 📞 Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Run tests with debug mode: `DEBUG=true npm run test:connection`
3. Review the logs for detailed error messages
4. Ensure your WordPress site is accessible and the REST API is enabled

---

**Happy WordPress management with MCP! 🎉**
