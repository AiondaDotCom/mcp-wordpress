#!/usr/bin/env node

/**
 * MCP WordPress Server
 * Main entry point for the Model Context Protocol server that provides WordPress management capabilities
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
dotenv.config({ path: join(rootDir, '.env') });

// Import WordPress client and tools
try {
  const { WordPressClient } = await import('./client/api.js');
  const { debug } = await import('./utils/debug.js');

  const postTools = await import('./tools/posts.js');
  const pageTools = await import('./tools/pages.js');
  const mediaTools = await import('./tools/media.js');
  const userTools = await import('./tools/users.js');
  const commentTools = await import('./tools/comments.js');
  const taxonomyTools = await import('./tools/taxonomies.js');
  const siteTools = await import('./tools/site.js');
  const authTools = await import('./tools/auth.js');

  /**
   * MCP WordPress Server Class
   */
  class WordPressMCPServer {
    constructor() {
      this.server = new Server(
        {
          name: 'mcp-wordpress',
          version: '1.0.0',
        },
        {
          capabilities: {
            tools: {},
          },
        }
      );

      // Initialize WordPress client
      this.wordpressClient = new WordPressClient();

      // Register tools and handlers
      this.setupTools();
      this.setupHandlers();

      debug.log('MCP WordPress Server initialized');
    }

    setupTools() {
      this.tools = new Map();

    // Post tools
    this.registerTool(postTools.listPosts, postTools.handleListPosts);
    this.registerTool(postTools.getPost, postTools.handleGetPost);
    this.registerTool(postTools.createPost, postTools.handleCreatePost);
    this.registerTool(postTools.updatePost, postTools.handleUpdatePost);
    this.registerTool(postTools.deletePost, postTools.handleDeletePost);
    this.registerTool(postTools.getPostRevisions, postTools.handleGetPostRevisions);

    // Page tools
    this.registerTool(pageTools.listPages, pageTools.handleListPages);
    this.registerTool(pageTools.getPage, pageTools.handleGetPage);
    this.registerTool(pageTools.createPage, pageTools.handleCreatePage);
    this.registerTool(pageTools.updatePage, pageTools.handleUpdatePage);
    this.registerTool(pageTools.deletePage, pageTools.handleDeletePage);
    this.registerTool(pageTools.getPageRevisions, pageTools.handleGetPageRevisions);

    // Media tools
    this.registerTool(mediaTools.listMedia, mediaTools.handleListMedia);
    this.registerTool(mediaTools.getMedia, mediaTools.handleGetMedia);
    this.registerTool(mediaTools.uploadMedia, mediaTools.handleUploadMedia);
    this.registerTool(mediaTools.updateMedia, mediaTools.handleUpdateMedia);
    this.registerTool(mediaTools.deleteMedia, mediaTools.handleDeleteMedia);
    this.registerTool(mediaTools.getMediaSizes, mediaTools.handleGetMediaSizes);

    // User tools
    this.registerTool(userTools.listUsers, userTools.handleListUsers);
    this.registerTool(userTools.getUser, userTools.handleGetUser);
    this.registerTool(userTools.getCurrentUser, userTools.handleGetCurrentUser);
    this.registerTool(userTools.createUser, userTools.handleCreateUser);
    this.registerTool(userTools.updateUser, userTools.handleUpdateUser);
    this.registerTool(userTools.deleteUser, userTools.handleDeleteUser);

    // Comment tools
    this.registerTool(commentTools.listComments, commentTools.handleListComments);
    this.registerTool(commentTools.getComment, commentTools.handleGetComment);
    this.registerTool(commentTools.createComment, commentTools.handleCreateComment);
    this.registerTool(commentTools.updateComment, commentTools.handleUpdateComment);
    this.registerTool(commentTools.deleteComment, commentTools.handleDeleteComment);
    this.registerTool(commentTools.approveComment, commentTools.handleApproveComment);
    this.registerTool(commentTools.spamComment, commentTools.handleSpamComment);

    // Taxonomy tools
    this.registerTool(taxonomyTools.listCategories, taxonomyTools.handleListCategories);
    this.registerTool(taxonomyTools.getCategory, taxonomyTools.handleGetCategory);
    this.registerTool(taxonomyTools.createCategory, taxonomyTools.handleCreateCategory);
    this.registerTool(taxonomyTools.updateCategory, taxonomyTools.handleUpdateCategory);
    this.registerTool(taxonomyTools.deleteCategory, taxonomyTools.handleDeleteCategory);
    this.registerTool(taxonomyTools.listTags, taxonomyTools.handleListTags);
    this.registerTool(taxonomyTools.getTag, taxonomyTools.handleGetTag);
    this.registerTool(taxonomyTools.createTag, taxonomyTools.handleCreateTag);
    this.registerTool(taxonomyTools.updateTag, taxonomyTools.handleUpdateTag);
    this.registerTool(taxonomyTools.deleteTag, taxonomyTools.handleDeleteTag);

    // Site tools
    this.registerTool(siteTools.getSiteSettings, siteTools.handleGetSiteSettings);
    this.registerTool(siteTools.updateSiteSettings, siteTools.handleUpdateSiteSettings);
    this.registerTool(siteTools.getSiteStats, siteTools.handleGetSiteStats);
    this.registerTool(siteTools.searchSite, siteTools.handleSearchSite);
    this.registerTool(siteTools.getApplicationPasswords, siteTools.handleGetApplicationPasswords);
    this.registerTool(siteTools.createApplicationPassword, siteTools.handleCreateApplicationPassword);
    this.registerTool(siteTools.deleteApplicationPassword, siteTools.handleDeleteApplicationPassword);

    // Auth tools
    this.registerTool(authTools.testAuth, authTools.handleTestAuth);
    this.registerTool(authTools.getAuthStatus, authTools.handleGetAuthStatus);
    this.registerTool(authTools.startOAuthFlow, authTools.handleStartOAuthFlow);
    this.registerTool(authTools.completeOAuthFlow, authTools.handleCompleteOAuthFlow);
    this.registerTool(authTools.refreshOAuthToken, authTools.handleRefreshOAuthToken);
    this.registerTool(authTools.switchAuthMethod, authTools.handleSwitchAuthMethod);

      debug.log(`Registered ${this.tools.size} WordPress tools`);
    }

    registerTool(toolDefinition, handler) {
      if (!toolDefinition || !toolDefinition.name || !handler) {
        return;
      }

      this.tools.set(toolDefinition.name, {
        definition: toolDefinition,
        handler: handler
      });
    }

    setupHandlers() {
      // Handle list_tools requests
      this.server.setRequestHandler(ListToolsRequestSchema, async () => {
        const tools = Array.from(this.tools.values()).map(tool => ({
          name: tool.definition.name,
          description: tool.definition.description,
          inputSchema: tool.definition.inputSchema
        }));

        return { tools };
      });

      // Handle call_tool requests
      this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;

        const tool = this.tools.get(name);
        if (!tool) {
          throw new Error(`Unknown tool: ${name}`);
        }

        try {
          // Test authentication if needed
          if (name !== 'wp_test_auth' && name !== 'wp_get_auth_status') {
            if (!this.wordpressClient.authenticated) {
              await this.wordpressClient.authenticate();
            }
          }

          // Call the tool handler
          const result = await tool.handler(this.wordpressClient, args || {});
          return result;

        } catch (error) {
          // Return error in MCP format
          return {
            content: [{
              type: 'text',
              text: `❌ Error: ${error.message}`
            }],
            isError: true
          };
        }
      });
    }

    async start() {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
    }
  }

  // Start server
  const server = new WordPressMCPServer();
  await server.start();

} catch (error) {
  console.error('Fatal error during startup:', error.message);
  process.exit(1);
}