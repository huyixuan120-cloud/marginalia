"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Comment } from "./CommentSection";
import { ChevronDown, ChevronRight, MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";

interface CommentNodeProps {
  comment: Comment;
  depth: number;
  isUserLoggedIn: boolean;
  currentUserId: string | null;
  articleSlug: string;
  onCommentAdded: () => void;
}

// Format time ago
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

// Extract username from email
function getUsernameFromEmail(email: string): string {
  return email.split("@")[0];
}

export function CommentNode({
  comment,
  depth,
  isUserLoggedIn,
  currentUserId,
  articleSlug,
  onCommentAdded,
}: CommentNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const hasChildren = comment.children && comment.children.length > 0;
  const showAuthWall = !isUserLoggedIn && depth > 0;
  const isAuthor = currentUserId === comment.user_id;
  const isDeleted = comment.is_deleted;

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUserLoggedIn || !replyContent.trim()) return;

    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("comments").insert({
      content: replyContent.trim(),
      user_id: user.id,
      user_email: user.email!,
      article_slug: articleSlug,
      parent_id: comment.id,
    });

    if (error) {
      console.error("Error posting reply:", error);
      alert("Failed to post reply. Please try again.");
    } else {
      setReplyContent("");
      setIsReplying(false);
      onCommentAdded(); // Refresh comments
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!isAuthor || isDeleted) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this comment? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);
    const { error } = await supabase
      .from("comments")
      .update({ is_deleted: true })
      .eq("id", comment.id);

    if (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
      setDeleting(false);
    } else {
      onCommentAdded(); // Refresh to show the deleted state
    }
  };

  // If user is not logged in and depth > 0, don't render this comment
  if (showAuthWall) {
    return null;
  }

  return (
    <div className="group">
      {/* Comment Container */}
      <div
        className={`relative ${
          depth > 0 ? "ml-6 border-l-2 border-stone-200 pl-4" : ""
        }`}
      >
        {/* Comment Header & Content */}
        <div className="rounded-lg bg-white p-4 transition-colors hover:bg-stone-50">
          <div className="mb-2 flex items-center gap-2">
            {/* Collapse Button */}
            {hasChildren && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex h-5 w-5 items-center justify-center rounded text-stone-400 hover:bg-stone-200 hover:text-stone-900"
                aria-label={isCollapsed ? "Expand thread" : "Collapse thread"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Author & Time */}
            <div className="flex items-center gap-2 font-sans text-xs">
              <span className="font-bold text-stone-900">
                {getUsernameFromEmail(comment.user_email)}
              </span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500">{timeAgo(comment.created_at)}</span>

              {/* Delete Button (only for author, not already deleted) */}
              {isAuthor && !isDeleted && (
                <>
                  <span className="text-stone-400">•</span>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                    aria-label="Delete comment"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="text-xs">{deleting ? "Deleting..." : "Delete"}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Comment Content */}
          {!isCollapsed && (
            <>
              {isDeleted ? (
                <p className="mb-3 font-sans text-sm italic text-stone-400">
                  [Comment deleted by author]
                </p>
              ) : (
                <p className="mb-3 whitespace-pre-wrap font-sans text-stone-800 leading-relaxed">
                  {comment.content}
                </p>
              )}

              {/* Actions - Hide for deleted comments */}
              {!isDeleted && (
                <div className="flex items-center gap-4">
                  {isUserLoggedIn ? (
                    <button
                      onClick={() => setIsReplying(!isReplying)}
                      className="flex items-center gap-1 font-sans text-xs font-bold text-stone-500 hover:text-stone-900"
                    >
                      <MessageSquare className="h-3 w-3" />
                      Reply
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-1 font-sans text-xs font-bold text-stone-500 hover:text-stone-900"
                    >
                      <MessageSquare className="h-3 w-3" />
                      Sign in to reply
                    </Link>
                  )}
                </div>
              )}

              {/* Reply Form */}
              {isReplying && isUserLoggedIn && (
                <form onSubmit={handleSubmitReply} className="mt-4">
                  <div className="rounded border border-stone-200 bg-stone-50 p-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      disabled={submitting}
                      rows={3}
                      autoFocus
                      className="w-full resize-none border-none bg-transparent font-sans text-sm text-stone-900 placeholder-stone-400 focus:outline-none disabled:opacity-50"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsReplying(false);
                          setReplyContent("");
                        }}
                        disabled={submitting}
                        className="px-3 py-1 font-sans text-xs text-stone-600 hover:text-stone-900 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || !replyContent.trim()}
                        className="bg-stone-900 px-4 py-1 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-stone-700 disabled:opacity-50"
                      >
                        {submitting ? "Posting..." : "Reply"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Children Comments */}
        {!isCollapsed && hasChildren && (
          <div className="mt-3 space-y-3">
            {isUserLoggedIn ? (
              // Logged-in users see all children
              comment.children!.map((child) => (
                <CommentNode
                  key={child.id}
                  comment={child}
                  depth={depth + 1}
                  isUserLoggedIn={isUserLoggedIn}
                  currentUserId={currentUserId}
                  articleSlug={articleSlug}
                  onCommentAdded={onCommentAdded}
                />
              ))
            ) : (
              // Guest users see auth wall for nested comments
              <div className="relative ml-6 border-l-2 border-stone-200 pl-4">
                {/* Blurred Preview */}
                <div className="pointer-events-none relative overflow-hidden rounded-lg">
                  <div className="blur-sm">
                    <div className="rounded-lg bg-white p-4">
                      <div className="mb-2 h-3 w-32 rounded bg-stone-200"></div>
                      <div className="h-16 rounded bg-stone-100"></div>
                    </div>
                  </div>

                  {/* Overlay with CTA */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-100 via-stone-50/80 to-transparent">
                    <div className="pointer-events-auto text-center">
                      <p className="mb-3 font-sans text-sm font-medium text-stone-900">
                        Sign in to read {comment.children!.length} {comment.children!.length === 1 ? "reply" : "replies"}
                      </p>
                      <Link
                        href="/login"
                        className="inline-block bg-stone-900 px-6 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-stone-700"
                      >
                        Join the discussion
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
