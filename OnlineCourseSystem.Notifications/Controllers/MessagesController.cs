using GlobalResponse.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.Features.Messages.Commands;
using OnlineCourseSystem.Notifications.Features.Messages.DTOs;
using OnlineCourseSystem.Notifications.Features.Messages.Queries;

namespace OnlineCourseSystem.Notifications.Controllers
{
    /// <summary>
    /// Handles direct user-to-user messaging.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MessagesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Sends a new message from one user to another.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Send(CreateMessageDto request)
        {
            var command = new SendMessageCommand(request);

            var result = await _mediator.Send(command);

            return this.OkResponse(result, "Message sent successfully.");
        }

        /// <summary>
        /// Retrieves chat history for a logical conversation.
        /// </summary>
        /// <param name="conversationId">
        /// Deterministic identifier combining the two user IDs (and optional course ID)
        /// returned when sending a message.
        /// </param>
        /// <param name="readerId">
        /// Optional user id of the reader; when provided, messages they receive in this conversation
        /// are marked as read.
        /// </param>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(
            [FromQuery] string conversationId,
            [FromQuery] Guid? readerId,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 50)
        {
            var query = new GetConversationQuery(
                conversationId,
                pageNumber,
                pageSize,
                readerId);

            var result = await _mediator.Send(query);

            return this.OkResponse(result, "Conversation messages returned successfully.");
        }
    }
}


