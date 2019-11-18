export const addNewCommandToHelp = (commandName) => `/login - returns the HTTP authorization header required to talk to external system",
        botMention + " /${commandName.toLowerCase()} - auto generated command, please insert description",`;

export const genericCommandHandler = (basePackage, commandName) => `package ${basePackage}.command;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import ${basePackage}.internal.command.CommandHandler;
import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.message.model.SymphonyMessage;

public class ${commandName}CommandHandler extends CommandHandler {

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " /${commandName.toLowerCase()}")
        .asPredicate();
  }

  @Override
  public void handle(BotCommand command, SymphonyMessage response) {

    String myMessage = "<p style='margin-bottom:6px;'>Hey there my new command!</p>";

    Map<String, Object> data = new HashMap<>();
    data.put("content", "this is data that came from the bot");

    response.setEnrichedMessage(myMessage, "${basePackage}.${commandName.toLowerCase()}", data, "1.0");
  }
}
`;

export const formBuilderSymphonyElementsHandler = (basePackage, commandName, formId) => `package ${basePackage}.elements;

import java.util.Arrays;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.elements.ElementsHandler;
import ${basePackage}.internal.event.model.SymphonyElementsEvent;
import ${basePackage}.internal.message.model.SymphonyMessage;

import model.DropdownMenuOption;
import model.FormButtonType;
import utils.FormBuilder;

public class ${commandName}Handler extends ElementsHandler {
  private static final String FORM_ID = "${formId}";

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " /${commandName.toLowerCase()}")
        .asPredicate();
  }

  @Override
  protected String getElementsFormId() {
    return FORM_ID;
  }

  @Override
  public void displayElements(BotCommand command,
      SymphonyMessage commandResponse) {

    String formML = FormBuilder.builder(FORM_ID)
        .addHeader(6, "Sample Form")
        .addTextField("secCode", "", "Enter a code..", true, false, 1, 15)
        .addHeader(6, "Assigned To:")
        .addPersonSelector("assignedTo", "Assign to..", false)
        .addHeader(6, "Trade Status:")
        .addRadioButton("status", "Pending", "pending", true)
        .addRadioButton("status", "Confirmed", "confirmed", false)
        .addRadioButton("status", "Settled", "settled", false)
        .addHeader(6, "Desk:")
        .addDropdownMenu("assetClass", false, Arrays.asList(
            new DropdownMenuOption("eq", "Equities", true),
            new DropdownMenuOption("fi", "Credit", false),
            new DropdownMenuOption("fx", "FX", false),
            new DropdownMenuOption("rates", "Rates", false)
        ))
        .addCheckBox("deliverable", "Non-Deliverable?", "nd", false)
        .addHeader(6, "Remarks:")
        .addTextArea("remarks", "", "Enter your remarks..", false)
        .addButton("confirm", "Confirm", FormButtonType.ACTION)
        .addButton("reset", "Reset", FormButtonType.RESET)
        .formatElement();

    commandResponse.setMessage(formML);
  }

  @Override
  public void handleAction(SymphonyElementsEvent event,
      SymphonyMessage elementsResponse) {
    elementsResponse.setMessage("Received and treated the form response!");
  }

}`;

export const customSymphonyElementsHandler = (basePackage, commandName, formId) => `package ${basePackage}.elements;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.elements.ElementsHandler;
import ${basePackage}.internal.event.model.SymphonyElementsEvent;
import ${basePackage}.internal.message.model.SymphonyMessage;

public class ${commandName}Handler extends ElementsHandler {
  private static final String FORM_ID = "${formId}";

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " /${commandName.toLowerCase()}")
        .asPredicate();
  }

  @Override
  protected String getElementsFormId() {
    return FORM_ID;
  }

  @Override
  public void displayElements(BotCommand command,
      SymphonyMessage elementsResponse) {
    Map<String, String> data = new HashMap<>();
    data.put("form_id", FORM_ID);
    elementsResponse.setTemplateFile("${commandName.toLowerCase()}.ftl", data);
  }

  @Override
  public void handleAction(SymphonyElementsEvent event,
      SymphonyMessage elementsResponse) {
    elementsResponse.setMessage("Received and treated the form response!");
  }

}`;

export const customSymphonyElementsTemplate = `<form id="\$\{form_id\}">
  <h3>Sample form</h3>
  <h6>From currency</h6>
  <text-field minlength="3" maxlength="3" masked="false" name="fromCurrency" required="true"></text-field>
  <h6>To currency</h6>
  <text-field minlength="3" maxlength="3" masked="false" name="toCurrency" required="true"></text-field>
  <h6>Amount</h6>
  <text-field minlength="1" maxlength="9" masked="false" name="amount" required="true"></text-field>
  <h6>Assigned To:</h6>
  <person-selector name="assignedTo" placeholder="Assign to.." required="false" />
  <h6>Quote Status:</h6>
  <radio name="status" checked="true" value="pending">Pending</radio>
  <radio name="status" checked="false" value="confirmed">Confirmed</radio>
  <radio name="status" checked="false" value="settled">Settled</radio>
  <h6>Remarks:</h6>
  <textarea name="remarks" placeholder="Enter your remarks.." required="false"></textarea>
  <button name="confirm" type="action">Confirm</button>
  <button name="reset" type="reset">Reset</button>
</form>
`;

