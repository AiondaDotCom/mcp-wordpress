# 🔧 MCP WordPress Server Configuration

## Claude Desktop Configuration

To use the MCP WordPress server with Claude Desktop, add this configuration to your Claude Desktop settings:

### 1. Claude Desktop Config File Location

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Linux:** `~/.config/Claude/claude_desktop_config.json`

### 2. Configuration JSON

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "node",
      "args": ["C:\\laragon\\www\\mcpwp\\mcp-wordpress\\src\\index.js"],
      "env": {
        "WORDPRESS_URL": "https://saterembiga.test",
        "WORDPRESS_USERNAME": "your_username",
        "WORDPRESS_APP_PASSWORD": "your_app_password",
        "NODE_TLS_REJECT_UNAUTHORIZED": "0",
        "DEBUG": "true"
      }
    }
  }
}
```

**Important:** Replace the values with your actual credentials!

### 3. Alternative: Using .env file

If you prefer to use the .env file (recommended):

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "node",
      "args": ["C:\\laragon\\www\\mcpwp\\mcp-wordpress\\src\\index.js"],
      "cwd": "C:\\laragon\\www\\mcpwp\\mcp-wordpress"
    }
  }
}
```

This will automatically load your `.env` file.

## 🚀 Starting the Server

### Method 1: Standalone Server
```bash
cd C:\laragon\www\mcpwp\mcp-wordpress
npm run start
```

### Method 2: Debug Mode
```bash
cd C:\laragon\www\mcpwp\mcp-wordpress
npm run dev
```

### Method 3: Direct Node Command
```bash
node C:\laragon\www\mcpwp\mcp-wordpress\src\index.js
```

## 📋 Available MCP Tools (54 total)

Once connected, you can use these tools in Claude:

### Posts Management (6 tools)
- `wp_list_posts` - List WordPress posts
- `wp_get_post` - Get a specific post
- `wp_create_post` - Create a new post
- `wp_update_post` - Update an existing post
- `wp_delete_post` - Delete a post
- `wp_get_post_revisions` - Get post revision history

### Pages Management (6 tools)
- `wp_list_pages` - List WordPress pages
- `wp_get_page` - Get a specific page
- `wp_create_page` - Create a new page
- `wp_update_page` - Update an existing page
- `wp_delete_page` - Delete a page
- `wp_get_page_revisions` - Get page revision history

### Media Management (6 tools)
- `wp_list_media` - List media files
- `wp_get_media` - Get media file details
- `wp_upload_media` - Upload new media
- `wp_update_media` - Update media metadata
- `wp_delete_media` - Delete media files
- `wp_get_media_sizes` - Get available image sizes

### User Management (6 tools)
- `wp_list_users` - List WordPress users
- `wp_get_user` - Get user details
- `wp_get_current_user` - Get current authenticated user
- `wp_create_user` - Create new user
- `wp_update_user` - Update user information
- `wp_delete_user` - Delete a user

### Comments Management (7 tools)
- `wp_list_comments` - List comments
- `wp_get_comment` - Get comment details
- `wp_create_comment` - Create new comment
- `wp_update_comment` - Update comment
- `wp_delete_comment` - Delete comment
- `wp_approve_comment` - Approve comment
- `wp_spam_comment` - Mark comment as spam

### Taxonomy Management (10 tools)
- `wp_list_categories` - List categories
- `wp_get_category` - Get category details
- `wp_create_category` - Create new category
- `wp_update_category` - Update category
- `wp_delete_category` - Delete category
- `wp_list_tags` - List tags
- `wp_get_tag` - Get tag details
- `wp_create_tag` - Create new tag
- `wp_update_tag` - Update tag
- `wp_delete_tag` - Delete tag

### Site Management (7 tools)
- `wp_get_site_settings` - Get site settings
- `wp_update_site_settings` - Update site settings
- `wp_get_site_stats` - Get site statistics
- `wp_search_site` - Search site content
- `wp_get_application_passwords` - List application passwords
- `wp_create_application_password` - Create application password
- `wp_delete_application_password` - Delete application password

### Authentication (6 tools)
- `wp_test_auth` - Test authentication
- `wp_get_auth_status` - Get authentication status
- `wp_start_oauth_flow` - Start OAuth flow (placeholder)
- `wp_complete_oauth_flow` - Complete OAuth flow (placeholder)
- `wp_refresh_oauth_token` - Refresh OAuth token (placeholder)
- `wp_switch_auth_method` - Switch authentication method (placeholder)

## 💬 Example Usage in Claude

Once configured, you can ask Claude things like:

```
"List my recent WordPress posts"
"Create a new blog post about MCP integration"
"Upload an image to my WordPress media library"
"Show me my site's current settings"
"List all users on my WordPress site"
"Create a new category called 'Technology'"
```

Claude will automatically use the appropriate MCP tools to interact with your WordPress site.

## 🔍 Testing the Connection

Before using with Claude, test the server:

```bash
# Test site compatibility
npm run test:site

# Test authentication
npm run test:connection

# Test all tools load correctly
node test-tools.js
```

## 🐛 Troubleshooting

### Server Won't Start
1. Check your `.env` file has correct credentials
2. Ensure WordPress site is accessible
3. Run `npm run test:connection` first

### Claude Can't Connect
1. Verify the path in `claude_desktop_config.json` is correct
2. Restart Claude Desktop after config changes
3. Check Claude Desktop logs for errors

### Authentication Fails
1. Verify Application Password is correct
2. Check username is correct
3. Ensure Application Passwords are enabled in WordPress

## 📊 Server Status

Check if everything is working:

```bash
# Quick status check
npm run status

# Detailed connection test
npm run test:connection

# Debug mode
DEBUG=true npm run start
```

---

**Ready to manage your WordPress site through Claude! 🎉**
